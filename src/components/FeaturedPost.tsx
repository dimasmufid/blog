"use client";

import { useState } from "react";
import { formatDate } from "@/lib/utils";
import { getBlogPostImage } from "@/lib/imageUtils";
import Link from "next/link";
import Image from "next/image";

interface FeaturedPostProps {
  title: string;
  excerpt: string;
  date: string;
  slug: string;
  tag?: string[];
  image?: string;
}

export function FeaturedPost({ title, excerpt, date, slug, tag, image }: FeaturedPostProps) {
  const [imageError, setImageError] = useState(false);
  const imageSrc = getBlogPostImage(image);
  return (
    <article className="group h-full">
      <Link href={`/blog/${slug}`} className="block h-full">
        <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
          {/* Featured Image */}
          <div className="aspect-[16/9] relative overflow-hidden flex-shrink-0">
            <Image
              src={imageError ? '/placeholder.jpg' : imageSrc}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={() => setImageError(true)}
            />
            
            {/* Light overlay only when there are tags to improve text readability */}
            {tag && tag.length > 0 && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            )}
            
            {/* Tags overlay */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex gap-2">
                {tag && tag.slice(0, 2).map((t) => (
                  <span
                    key={t}
                    className="px-2 py-1 text-xs rounded-full bg-white/90 text-gray-700 font-medium backdrop-blur-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-bold mb-3 text-black group-hover:text-gray-800 transition-colors line-clamp-2 min-h-[3.5rem]">
              {title}
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed flex-grow min-h-[4rem]">
              {excerpt}
            </p>
            <time className="text-xs text-gray-500 font-medium mt-auto">
              {formatDate(date)}
            </time>
          </div>
        </div>
      </Link>
    </article>
  );
}