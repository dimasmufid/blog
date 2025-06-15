import { FeaturedArticles } from "@/components/FeaturedArticles";
import { LatestPosts } from "@/components/LatestPosts";
import { SocialLinks } from "@/components/SocialLinks";
import { getAllPosts, getFeaturedPosts } from "@/lib/markdown";
import Image from "next/image";

export default function Home() {
  const allPosts = getAllPosts();
  const featuredPosts = getFeaturedPosts();
  const latestPosts = allPosts.slice(0, 4); // Get 4 latest posts for the latest section

  return (
    <>
      {/* Hero Section */}
      <section className="px-4 py-8 pt-12 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
          {/* Image container - defines the scroll height */}
          <div className="flex-shrink-0 lg:w-auto w-full">
            <Image
              src="/cover.jpg"
              alt="Cover"
              width={600}
              height={600}
              className="rounded-lg w-full lg:w-auto h-auto"
            />
          </div>

          {/* Sticky text content */}
          <div className="flex-1 relative">
            <div className="lg:sticky top-20 flex flex-col gap-6 h-fit">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                Hey there ✌️ I&apos;m Dimas
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl">
                I&apos;m on a mission to build an AI startup that doesn&apos;t
                just chase trends — but creates real innovation that valuable
                for others.
              </p>
              <SocialLinks />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <FeaturedArticles posts={featuredPosts} />

      {/* Latest Posts */}
      <LatestPosts posts={latestPosts} />
    </>
  );
}
