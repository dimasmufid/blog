import { LatestPost } from "./LatestPost";
import { BlogPostData } from "@/lib/markdown";
import { Button } from "./ui/button";
import Link from "next/link";

interface LatestPostsProps {
  posts: BlogPostData[];
}

export function LatestPosts({ posts }: LatestPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="py-12 px-4 max-w-4xl mx-auto flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-black mb-8">Latest Posts</h2>

      <div className="bg-white rounded-lg overflow-hidden">
        {posts.map((post) => (
          <LatestPost key={post.slug} {...post} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Link href="/blog">
          <Button variant="outline" className="hover:cursor-pointer">
            See all posts
          </Button>
        </Link>
      </div>
    </section>
  );
}
