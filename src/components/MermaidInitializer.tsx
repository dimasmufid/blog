'use client'

import { useEffect } from 'react'
import mermaid from 'mermaid'

export function MermaidInitializer() {
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
    })

    // Re-render mermaid diagrams when content changes
    const renderMermaid = async () => {
      const mermaidElements = document.querySelectorAll('.mermaid:not([data-processed])')
      
      for (let i = 0; i < mermaidElements.length; i++) {
        const element = mermaidElements[i] as HTMLElement
        const id = `mermaid-${i}-${Date.now()}`
        const code = element.textContent || ''
        
        if (code.trim()) {
          try {
            element.setAttribute('data-processed', 'true')
            const { svg } = await mermaid.render(id, code)
            element.innerHTML = svg
          } catch (error) {
            console.error('Mermaid rendering error:', error)
            element.innerHTML = `<pre><code>${code}</code></pre>`
          }
        }
      }
    }

    // Initial render with delay to ensure DOM is ready
    setTimeout(renderMermaid, 100)

    // Re-render on route changes
    const observer = new MutationObserver(() => {
      setTimeout(renderMermaid, 100)
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [])

  return null
}