---
title: Mark PydanticAI - From Plain Docs to Structured AI
date: 2025-05-24
excerpt: The meet with PydanticAI, which will be the fundamental of Mark AI system
tag: ["mark"]
---

# Background

When I started building Mark's AI backend, I was doing what most developers do - reading the official documentation from OpenAI and Anthropic, copying their examples, and building my own wrapper functions around their APIs. It worked, but as Mark grew more complex, I started hitting walls.

The main issues I faced were:

1. **Inconsistent response handling** - Different providers return data in different formats
2. **No built-in validation** - I had to manually validate AI responses
3. **Streaming complexity** - Implementing streaming responses was a nightmare with plain APIs
4. **Tool calling chaos** - Managing function calls and their schemas was becoming unmanageable
5. **Type safety** - No proper TypeScript-like experience in Python for AI responses

I was spending more time wrestling with API inconsistencies than actually building features for Mark.

# The Discovery

While researching better ways to handle AI interactions, I stumbled upon [PydanticAI](https://ai.pydantic.dev/). Created by the same team behind Pydantic (which I already loved for FastAPI), it promised to solve exactly the problems I was facing.

The tagline caught my attention: _"Agent Framework / shim to use Pydantic with LLMs"_.

What really sold me was seeing this in their docs:

```python
from pydantic_ai import Agent

agent = Agent('openai:gpt-4o')

@agent.tool
def get_weather(city: str) -> str:
    return f"It's sunny in {city}!"

result = agent.run('What is the weather like in London?')
print(result.data)
```

This looked so much cleaner than what I was doing with raw OpenAI calls.

# The Migration Journey

## Before: The Pain of Raw APIs

Here's what my old code looked like for a simple chat completion:

```python
import openai
from typing import Dict, Any
import json

async def chat_with_ai(messages: list, stream: bool = False):
    try:
        if stream:
            response = await openai.ChatCompletion.acreate(
                model="gpt-4",
                messages=messages,
                stream=True
            )

            async for chunk in response:
                if chunk.choices[0].delta.content:
                    yield chunk.choices[0].delta.content
        else:
            response = await openai.ChatCompletion.acreate(
                model="gpt-4",
                messages=messages
            )
            return response.choices[0].message.content

    except Exception as e:
        # Handle different types of errors manually
        if "rate_limit" in str(e):
            # Custom rate limit handling
            pass
        elif "context_length" in str(e):
            # Custom context length handling
            pass
        # ... more manual error handling
```

And for function calling? Don't even get me started. It was a mess of JSON schema definitions and manual parsing.

In addition, I also have to handle the context length, rate limit, and other errors manually.

## After: The PydanticAI Way

Here's the same functionality with PydanticAI:

```python
from pydantic_ai import Agent
from pydantic import BaseModel
from typing import AsyncIterator

# Define response structure
class ChatResponse(BaseModel):
    content: str
    confidence: float

# Create agent
agent = Agent(
    'openai:gpt-4o',
    result_type=ChatResponse,
    system_prompt="You are Mark, a business analyst AI assistant."
)

# Simple chat
async def chat_with_ai(user_message: str) -> ChatResponse:
    result = await agent.run(user_message)
    return result.data

# Streaming (this is where PydanticAI shines!)
async def chat_with_ai_stream(user_message: str) -> AsyncIterator[str]:
    async with agent.run_stream(user_message) as response:
        async for chunk in response.stream():
            yield chunk
```

The difference is night and day!

# The Game Changer: Streaming

The biggest win for me was streaming. In my old implementation, I had to:

1. Manually handle different streaming formats from different providers
2. Parse chunks differently for OpenAI vs Anthropic
3. Handle connection errors and reconnection logic
4. Manage partial responses and buffering

With PydanticAI, streaming just works:

```python
@app.post("/chat/stream")
async def stream_chat(request: ChatRequest):
    async def generate():
        async with agent.run_stream(request.message) as response:
            async for chunk in response.stream():
                yield f"data: {json.dumps({'content': chunk})}\n\n"

    return StreamingResponse(generate(), media_type="text/plain")
```

That's it. No more manual chunk parsing, no more provider-specific handling. PydanticAI abstracts all of that away.

# Advanced Features That Saved Me Hours

## 1. Tool Calling Made Simple

Before PydanticAI, defining tools for function calling was painful:

```python
# Old way - manual JSON schema
tools = [
    {
        "type": "function",
        "function": {
            "name": "query_database",
            "description": "Query the business database",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {"type": "string"},
                    "table": {"type": "string"}
                },
                "required": ["query", "table"]
            }
        }
    }
]
```

With PydanticAI:

```python
@agent.tool
async def query_database(query: str, table: str) -> Dict[str, Any]:
    """Query the business database for insights."""
    # Implementation here
    return await db.execute(query, table)
```

The schema is automatically generated from the function signature and docstring!

## 2. Multi-Provider Support

One of Mark's requirements is to support multiple AI providers for redundancy. With raw APIs, I had to maintain separate code paths:

```python
# Old way - provider-specific implementations
if provider == "openai":
    response = await openai_chat(messages)
elif provider == "anthropic":
    response = await anthropic_chat(messages)
elif provider == "gemini":
    response = await gemini_chat(messages)
```

With PydanticAI:

```python
# Just change the model string
agent = Agent('openai:gpt-4o')  # or 'anthropic:claude-3-5-sonnet' or 'gemini-1.5-pro'
```

Same code, different providers. Beautiful.

## 3. Structured Outputs

For Mark's business analysis features, I need structured data. Before:

```python
# Manual prompt engineering and parsing
prompt = """
Analyze this data and return a JSON with:
- summary: string
- insights: array of strings
- recommendations: array of objects with 'action' and 'priority'

Data: {data}
"""

response = await openai.chat(prompt)
try:
    parsed = json.loads(response.content)
    # Manual validation...
except:
    # Handle parsing errors...
```

With PydanticAI:

```python
class BusinessAnalysis(BaseModel):
    summary: str
    insights: List[str]
    recommendations: List[Recommendation]

class Recommendation(BaseModel):
    action: str
    priority: Literal['high', 'medium', 'low']

agent = Agent('openai:gpt-4o', result_type=BusinessAnalysis)
result = await agent.run(f"Analyze this data: {data}")
# result.data is automatically validated BusinessAnalysis object!
```

# The Results

After migrating to PydanticAI:

1. **Development speed increased by ~40%** - Less boilerplate, more features
2. **Streaming implementation went from 200+ lines to ~20 lines**
3. **Zero manual JSON parsing** - Everything is type-safe
4. **Multi-provider support** without code duplication
5. **Better error handling** - PydanticAI handles retries and rate limiting
6. **Easier testing** - Mock agents instead of HTTP calls

# Challenges and Gotchas

It wasn't all smooth sailing:

1. **Learning curve** - Had to understand PydanticAI's agent concepts
2. **Documentation gaps** - Some advanced features weren't well documented (it's still relatively new)
3. **Debugging** - When things go wrong, it's harder to see the raw API calls
4. **Dependency weight** - Adds another layer of abstraction

But honestly, the benefits far outweigh these minor issues.

# What's Next

PydanticAI has become the foundation of Mark's AI system. I'm now exploring:

1. **Agent composition** - Chaining multiple specialized agents
2. **Custom model providers** - Adding support for local models
3. **Advanced streaming** - Real-time data processing with streaming responses
4. **Agent memory** - Persistent conversation context

# Final Thoughts

If you're building AI applications in Python and still using raw provider APIs, do yourself a favor and check out PydanticAI. It's not just a wrapper - it's a paradigm shift that makes AI development actually enjoyable.

The time I save on boilerplate and error handling now goes into building actual features for Mark. And isn't that what we all want as builders?

For Mark specifically, PydanticAI has enabled features I couldn't have built efficiently with raw APIs - like real-time streaming analysis and multi-step reasoning workflows. It's become as essential to my stack as FastAPI itself.

_Next up: I'll be writing about how I'm using PydanticAI's agent composition to build Mark's multi-step business analysis pipeline. Stay tuned!_
