"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { FeaturedPost } from "./FeaturedPost";
import { BlogPostData } from "@/lib/markdown";

interface FeaturedArticlesProps {
  posts: BlogPostData[];
}

export function FeaturedArticles({ posts }: FeaturedArticlesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  if (posts.length === 0) {
    return null;
  }

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === posts.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? posts.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-black">FEATURED ARTICLES</h2>
        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
            aria-label="Previous article"
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
            aria-label="Next article"
          >
            <ChevronRight size={20} className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Desktop: Show all 3 cards */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <FeaturedPost key={post.slug} {...post} />
        ))}
      </div>

      {/* Mobile/Tablet: Carousel view */}
      <div className="lg:hidden relative">
        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {posts.map((post) => (
              <div key={post.slug} className="w-full flex-shrink-0 px-2">
                <FeaturedPost {...post} />
              </div>
            ))}
          </div>
        </div>
        
        {/* Dots indicator */}
        <div className="flex justify-center mt-6 gap-2">
          {posts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-black' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}