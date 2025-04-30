import { getAllPostSlugs, getPostData } from "@/lib/markdown";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const paths = getAllPostSlugs();
  return paths;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  try {
    const post = await getPostData((await params).slug);

    return (
      <article className="min-h-screen py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <header className="mb-10">
            <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
            <time className="text-sm text-muted-foreground">
              {formatDate(post.date)}
            </time>
            {post.tag && post.tag.length > 0 && (
              <div className="flex gap-2 mt-3">
                {post.tag.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>
          <div
            className="markdown-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>
    );
  } catch {
    notFound();
  }
}
