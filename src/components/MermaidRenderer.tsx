'use client'

import { useEffect } from 'react'
import mermaid from 'mermaid'

export function MermaidRenderer() {
  useEffect(() => {
    const initMermaid = async () => {
      mermaid.initialize({
        startOnLoad: false,
        theme: 'default',
        securityLevel: 'loose',
      })

      // Find all code blocks with language-mermaid and convert them
      const mermaidCodeBlocks = document.querySelectorAll('pre code.language-mermaid')
      
      for (let i = 0; i < mermaidCodeBlocks.length; i++) {
        const codeElement = mermaidCodeBlocks[i]
        const preElement = codeElement.parentElement
        
        if (preElement && !preElement.hasAttribute('data-mermaid-processed')) {
          const mermaidCode = codeElement.textContent || ''
          
          if (mermaidCode.trim()) {
            try {
              const id = `mermaid-${i}-${Date.now()}`
              const { svg } = await mermaid.render(id, mermaidCode)
              
              // Create a new div to replace the pre element
              const mermaidDiv = document.createElement('div')
              mermaidDiv.className = 'mermaid-diagram'
              mermaidDiv.innerHTML = svg
              
              // Replace the pre element with the mermaid div
              preElement.parentNode?.replaceChild(mermaidDiv, preElement)
              
            } catch (error) {
              console.error('Mermaid rendering error:', error)
              preElement.setAttribute('data-mermaid-processed', 'error')
            }
          }
        }
      }
    }

    // Run after a short delay to ensure DOM is ready
    const timer = setTimeout(initMermaid, 500)
    
    return () => clearTimeout(timer)
  }, [])

  return null
}