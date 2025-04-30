import { formatDate } from "@/lib/utils";
import Link from "next/link";

interface BlogPostProps {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  tag?: string[];
}

export function BlogPost({ title, excerpt, date, slug, tag }: BlogPostProps) {
  return (
    <article className="border-b border-border py-8">
      <Link href={`/blog/${slug}`} className="group block">
        <h2 className="text-2xl font-bold mb-2 text-primary/90 group-hover:text-primary transition-colors">
          {title}
        </h2>
        <p className="text-muted-foreground mb-2">{excerpt}</p>
        <div className="flex items-center justify-between">
          <time className="text-sm text-muted-foreground">
            {formatDate(date)}
          </time>
          {tag && tag.length > 0 && (
            <div className="flex gap-2">
              {tag.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 text-xs rounded-full bg-muted text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
