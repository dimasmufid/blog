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
        <div className="max-w-4xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <time className="text-muted-foreground">
              {formatDate(post.date)}
            </time>
          </header>
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>
    );
  } catch {
    notFound();
  }
}
