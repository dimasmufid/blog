import { getAllPostSlugs, getPostData } from "@/lib/markdown";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

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
      <article className="min-h-screen">
        {/* Article Title */}
        <header className="mb-12 text-left pt-8">
          <h1 className="text-4xl md:text-5xl font-bold text-black leading-tight">
            {post.title}
          </h1>
        </header>
        {/* Featured Image */}
        {post.image && (
          <div className="w-full relative mb-8">
            <Image
              src={post.image}
              alt={post.title}
              width={1200}
              height={600}
              className="w-full h-auto"
              priority
            />
          </div>
        )}

        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Sidebar - Author Info */}
            <aside className="lg:w-64 flex-shrink-0">
              <div className="sticky top-24">
                {/* Author Profile */}
                <div className="text-center lg:text-left mb-6">
                  <Image
                    src="/logo.jpg"
                    alt="Dimas Mufid"
                    width={80}
                    height={80}
                    className="rounded-full mx-auto lg:mx-0 mb-4"
                  />
                  <h3 className="font-bold text-black text-lg mb-1">
                    Dimas Mufid
                  </h3>
                  <time className="text-sm text-gray-600 block mb-4">
                    {formatDate(post.date)}
                  </time>

                  {/* Tags */}
                  {post.tag && post.tag.length > 0 && (
                    <div className="space-y-2">
                      {post.tag.map((tag: string) => (
                        <Link
                          key={tag}
                          href={`/tag/${tag}`}
                          className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm mr-2 transition-colors"
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 max-w-none">
              <div
                className="markdown-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </main>
          </div>
        </div>
      </article>
    );
  } catch {
    notFound();
  }
}
