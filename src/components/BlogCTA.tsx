import { Button } from "@/components/ui/button"
import { Github, Linkedin, Twitter, Send } from "lucide-react"

export function BlogCTA() {
  return (
    <div className="border-t border-gray-200 mt-12 pt-8">
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <h3 className="text-xl font-bold text-black mb-3">
          Let&apos;s build something amazing together
        </h3>
        <p className="text-gray-600 mb-6 max-w-lg mx-auto">
          Follow my journey building AI startups, connect for opportunities, or just say hi. 
          I&apos;m always excited to meet fellow builders and entrepreneurs.
        </p>
        
        <div className="flex flex-wrap justify-center gap-3 mb-4">
          <Button asChild size="sm" className="bg-black hover:bg-gray-800">
            <a
              href="https://t.me/dimasmufid"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Send className="h-4 w-4" />
              Telegram
            </a>
          </Button>
          
          <Button asChild size="sm" variant="outline">
            <a
              href="https://x.com/dimasmufid"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Twitter className="h-4 w-4" />
              Twitter
            </a>
          </Button>
          
          <Button asChild size="sm" variant="outline">
            <a
              href="https://linkedin.com/in/dimasmufid"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </Button>
          
          <Button asChild size="sm" variant="outline">
            <a
              href="https://github.com/dimasmufid"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </Button>
        </div>
        
        <p className="text-sm text-gray-500">
          Open to collaborations, consulting, and new opportunities
        </p>
      </div>
    </div>
  )
}