import { Button } from "@/components/ui/button";
import { Github, Linkedin, Twitter, Send } from "lucide-react";

export function SocialLinks() {
  return (
    <div className="flex gap-4">
      <Button variant="ghost" size="icon" asChild>
        <a
          href="https://t.me/dimasmufid"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Telegram"
        >
          <Send className="h-5 w-5" />
        </a>
      </Button>

      <Button variant="ghost" size="icon" asChild>
        <a
          href="https://x.com/dimasmufid"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Twitter"
        >
          <Twitter className="h-5 w-5" />
        </a>
      </Button>

      <Button variant="ghost" size="icon" asChild>
        <a
          href="https://linkedin.com/in/dimasmufid"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <Linkedin className="h-5 w-5" />
        </a>
      </Button>

      <Button variant="ghost" size="icon" asChild>
        <a
          href="https://github.com/dimasmufid"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <Github className="h-5 w-5" />
        </a>
      </Button>
    </div>
  );
}
