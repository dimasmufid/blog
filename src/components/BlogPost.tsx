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
    <article className="group">
      <Link href={`/blog/${slug}`} className="block">
        <div className="p-6 bg-white hover:shadow-md transition-shadow duration-300 h-full">
          <h2 className="text-xl font-bold mb-3 text-black group-hover:text-gray-800 transition-colors line-clamp-2">
            {title}
          </h2>
          <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
            {excerpt}
          </p>
          <div className="flex items-center justify-between mt-auto">
            <time className="text-xs text-gray-500 font-medium">
              {formatDate(date)}
            </time>
            {tag && tag.length > 0 && (
              <div className="flex gap-1 flex-wrap">
                {tag.slice(0, 2).map((t) => (
                  <span
                    key={t}
                    className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    {t}
                  </span>
                ))}
                {tag.length > 2 && (
                  <span className="text-xs text-gray-400">
                    +{tag.length - 2}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
