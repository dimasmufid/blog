import { BlogPost } from "@/components/BlogPost";
import { SocialLinks } from "@/components/SocialLinks";
import { getAllPosts } from "@/lib/markdown";

export default function Home() {
  // Get the latest 2 posts
  const latestPosts = getAllPosts().slice(0, 2);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome, I&apos;m Dimas
        </h1>
        <div className="max-w-2xl mx-auto space-y-6">
          <p className="text-lg text-muted-foreground text-center">
            I&apos;m on a mission to build an AI startup that doesn&apos;t just
            chase trends — but creates real innovation that matters globally.
          </p>
          <p className="text-lg text-muted-foreground text-center">
            I believe the next era belongs to the builders who combine research,
            technology, and heart — and I&apos;m sharing my journey openly:{" "}
            <span className="font-bold">
              the wins, the failures, and everything in between.
            </span>
          </p>
        </div>

        <div className="mt-10 space-y-6 text-center flex flex-col items-center">
          <p className="text-xl font-semibold">
            Follow along if you believe the future is built, not waited for.
          </p>
          <SocialLinks />
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8">Latest Posts</h2>
        <div className="space-y-4">
          {latestPosts.map((post) => (
            <BlogPost key={post.slug} {...post} />
          ))}
        </div>
      </section>
    </div>
  );
}
