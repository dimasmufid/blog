import { formatDate, calculateReadingTime } from "@/lib/utils";
import { getBlogPostImage } from "@/lib/imageUtils";
import Link from "next/link";
import Image from "next/image";

interface LatestPostProps {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  tag?: string[];
  image?: string;
  rawContent?: string;
  readTime?: string;
}

export function LatestPost({ title, excerpt, date, slug, tag, image, rawContent, readTime }: LatestPostProps) {
  const imageSrc = getBlogPostImage(image);
  const calculatedReadTime = rawContent ? calculateReadingTime(rawContent) : (readTime || "1 min read");

  return (
    <article className="group">
      <Link href={`/blog/${slug}`} className="flex gap-4 py-6 border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50 transition-colors">
        {/* Image */}
        <div className="flex-shrink-0">
          <div className="w-24 h-24 md:w-32 md:h-32 relative overflow-hidden rounded-lg">
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 96px, 128px"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg md:text-xl font-bold mb-2 text-black group-hover:text-gray-800 transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-gray-600 mb-3 line-clamp-2 text-sm md:text-base leading-relaxed">
            {excerpt}
          </p>
          
          {/* Meta info */}
          <div className="flex items-center gap-3 text-xs md:text-sm text-gray-500">
            <time>{formatDate(date)}</time>
            <span>•</span>
            <span>{calculatedReadTime}</span>
            {tag && tag.length > 0 && (
              <>
                <span>•</span>
                <div className="flex gap-1">
                  {tag.slice(0, 2).map((t, index) => (
                    <span key={t}>
                      {t}
                      {index < Math.min(tag.length, 2) - 1 && ", "}
                    </span>
                  ))}
                  {tag.length > 2 && <span> +{tag.length - 2}</span>}
                </div>
              </>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}