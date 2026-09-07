import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/shared/icon";
import type { PostCardData } from "@/lib/card-data";
import { formatDate, isoDate } from "@/lib/format";

export function PostCard({ post }: { post: PostCardData }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-gold">
      {post.coverImage ? (
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={post.coverImage}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            {post.category}
          </span>
        </div>
      ) : null}

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Icon name="calendar" className="h-4 w-4" />
            <time dateTime={isoDate(post.publishedAt)}>{formatDate(post.publishedAt)}</time>
          </span>
          <span className="inline-flex items-center gap-1">
            <Icon name="clock" className="h-4 w-4" />
            {post.readTimeMinutes} min read
          </span>
        </div>

        <h3 className="line-clamp-2 text-xl font-bold transition-colors group-hover:text-primary">
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>

        <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-foreground/70">
          {post.excerpt}
        </p>

        <ul className="flex flex-wrap gap-2">
          {post.tags?.slice(0, 3).map((tag) => (
            <li
              key={tag}
              className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs text-primary"
            >
              <Icon name="tag" className="h-3 w-3" />
              {tag}
            </li>
          ))}
        </ul>

        <p className="inline-flex items-center gap-1 text-sm font-medium text-primary">
          Read article
          <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </p>
      </div>
    </article>
  );
}
