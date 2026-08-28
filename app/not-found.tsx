import Link from "next/link";

export default function NotFound() {
  return (
    <div className="section">
      <div className="container flex min-h-[75vh] flex-col items-center justify-center py-24 text-center">
        <span className="select-none font-bricolage text-[7rem] font-black leading-none tracking-tighter text-fg sm:text-[10rem]">
          404
        </span>

        <div className="my-6 h-px w-16 bg-accent" aria-hidden="true" />

        <h1 className="mb-3 font-bricolage text-2xl font-bold tracking-tight text-fg">
          Page not found
        </h1>

        <p className="mb-10 max-w-sm font-inter text-sm leading-relaxed text-fg-muted">
          The page you&apos;re looking for has moved, been removed, or never
          existed.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-fg px-7 py-3 font-inter text-sm font-semibold text-bg-elevated transition-colors hover:bg-accent"
          >
            Go back home
          </Link>
          <Link
            href="/blogs"
            className="rounded-full border border-line-strong px-7 py-3 font-inter text-sm font-semibold text-fg transition-colors hover:border-accent hover:text-accent"
          >
            Read the blog
          </Link>
        </div>
      </div>
    </div>
  );
}
