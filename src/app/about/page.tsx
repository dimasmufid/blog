import Image from "next/image";
import { SocialLinks } from "@/components/SocialLinks";

export default function AboutPage() {
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About Me</h1>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="space-y-6 text-muted-foreground">
            <p>
              I&apos;m Dimas Mufid. Born and raised in Indonesia. I started my
              career working as a data engineer and software engineer across
              small startups — where I built data pipelines, software systems,
              and learned the entire journey of taking ideas from scratch to
              reality.
            </p>

            <p>
              Along the way, I realized:{" "}
              <span className="font-bold">
                It&apos;s not enough to build what&apos;s asked. True progress
                comes from building what&apos;s possible.
              </span>
            </p>

            <p>
              I don&apos;t claim to know everything. In fact, most days, I feel
              like I&apos;m just getting started. But what drives me is a simple
              belief:{" "}
              <span className="font-bold">
                Innovation isn&apos;t reserved for a few places or a few people.
                It can start anywhere — even here. Even now.
              </span>
            </p>

            <p>
              That&apos;s why I&apos;m learning deeply about AI, building
              products from scratch, and sharing my journey openly — the wins,
              the mistakes, and the lessons in between.
            </p>

            <p>
              My dream is that, one day, Indonesia will be seen not just as a
              consumer of technology, but as a creator. If I can contribute even
              a small step toward that future, it will be more than worth it.
            </p>

            <p>
              This site is where I document the journey. Thank you for being
              part of it.
            </p>

            <p>Let&apos;s keep learning. Let&apos;s keep building.</p>

            <div className="pt-4">
              <h2 className="text-2xl font-semibold mb-4">Connect With Me</h2>
              <SocialLinks />
            </div>
          </div>

          <div className="relative aspect-square w-full max-w-md mx-auto">
            <Image
              src="/profile.jpg"
              alt="Profile photo"
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
