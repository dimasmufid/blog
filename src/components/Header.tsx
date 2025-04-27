"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background">
      <div className="max-w-4xl mx-auto px-4 w-full">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/profile.jpg"
              alt="Logo"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="font-semibold">Dimas Mufid</span>
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              href="/blog"
              className={`text-sm transition-colors hover:text-primary ${
                isActive("/blog")
                  ? "text-foreground font-medium"
                  : "text-muted-foreground"
              }`}
            >
              Blog
            </Link>
            <Link
              href="/about"
              className={`text-sm transition-colors hover:text-primary ${
                isActive("/about")
                  ? "text-foreground font-medium"
                  : "text-muted-foreground"
              }`}
            >
              About
            </Link>
            {/* <Link
              href="/contact"
              className={`text-sm transition-colors hover:text-primary ${
                isActive("/contact")
                  ? "text-foreground font-medium"
                  : "text-muted-foreground"
              }`}
            >
              Contact
            </Link> */}
          </nav>
        </div>
      </div>
    </header>
  );
}
