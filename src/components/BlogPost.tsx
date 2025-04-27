import { formatDate } from "@/lib/utils";
import Link from "next/link";

interface BlogPostProps {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
}

export function BlogPost({ title, excerpt, date, slug }: BlogPostProps) {
  return (
    <article className="border-b border-border py-8">
      <Link href={`/blog/${slug}`} className="group block">
        <h2 className="text-2xl font-bold mb-2 text-primary/90 group-hover:text-primary transition-colors">
          {title}
        </h2>
        <p className="text-muted-foreground mb-2">{excerpt}</p>
        <time className="text-sm text-muted-foreground">
          {formatDate(date)}
        </time>
      </Link>
    </article>
  );
}
