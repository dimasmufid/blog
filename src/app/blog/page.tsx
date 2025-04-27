import { BlogPost } from "@/components/BlogPost";
import { getAllPosts } from "@/lib/markdown";

export default function BlogPage() {
  const blogPosts = getAllPosts();

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
        <div className="space-y-4">
          {blogPosts.map((post) => (
            <BlogPost key={post.slug} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
}
