import { cn } from "@charm/ui/cn";

type SectionHeadingProps = {
  /** Renders as h1 on standalone pages, h2 inside the home page sections. */
  as?: "h1" | "h2";
  eyebrow?: string;
  title: string;
  highlight?: string;
  description?: string;
  className?: string;
  align?: "center" | "left";
};

export function SectionHeading({
  as: Tag = "h2",
  eyebrow,
  title,
  highlight,
  description,
  className,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "animate-fade-in mb-12 sm:mb-16",
        align === "center" ? "text-center" : "text-left",
        className,
      )}
    >
      {eyebrow ? (
        <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold uppercase tracking-wider text-primary">
          {eyebrow}
        </span>
      ) : null}
      <Tag className="text-3xl font-bold sm:text-4xl lg:text-5xl">
        {title}
        {highlight ? (
          <>
            {" "}
            <span className="text-gradient">{highlight}</span>
          </>
        ) : null}
      </Tag>
      {description ? (
        <p
          className={cn(
            "mt-4 text-base text-muted-foreground sm:text-lg",
            align === "center" && "mx-auto max-w-2xl",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
