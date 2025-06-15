import { LatestPost } from "./LatestPost";
import { BlogPostData } from "@/lib/markdown";

interface LatestPostsProps {
  posts: BlogPostData[];
}

export function LatestPosts({ posts }: LatestPostsProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="py-12 px-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-black mb-8">LATEST</h2>

      <div className="bg-white rounded-lg overflow-hidden">
        {posts.map((post) => (
          <LatestPost key={post.slug} {...post} />
        ))}
      </div>
    </section>
  );
}
