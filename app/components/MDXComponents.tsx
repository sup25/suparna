import type { MDXComponents } from "mdx/types";
import { cn } from "@/lib/utils";

const CustomH1 = ({
  children,
  className,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
}) => (
  <h1
    className={cn(
      "text-4xl font-dmSerifDisplay font-bold text-[rgb(var(--foreground))] border-b border-gray-200",
      "tracking-tight leading-tight pb-4 mb-6",
      className
    )}
    {...props}
  >
    {children}
  </h1>
);

const CustomH2 = ({
  children,
  className,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
}) => (
  <h2
    className={cn(
      "text-3xl font-marcellus  font-semibold text-[rgb(var(--foreground))] border-b border-gray-200",
      "tracking-tight leading-tight mt-8 pb-3 mb-4",
      className
    )}
    {...props}
  >
    {children}
  </h2>
);

const CustomH3 = ({
  children,
  className,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
}) => (
  <h3
    className={cn(
      "text-2xl font-marcellus font-semibold text-[rgb(var(--foreground))]",
      "tracking-tight leading-snug mt-6 mb-3",
      className
    )}
    {...props}
  >
    {children}
  </h3>
);

const CustomP = ({
  children,
  className,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
}) => (
  <p
    className={cn(
      "text-base font-inter text-[rgb(var(--foreground))] leading-relaxed",
      "my-4",
      className
    )}
    {...props}
  >
    {children}
  </p>
);

const CustomBlockquote = ({
  children,
  className,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
}) => (
  <blockquote
    className={cn(
      "border-l-4 font-inter border-[#FFD700] ",
      "pl-4 py-3 my-6 rounded-r-lg",
      " italic font-medium",
      "shadow-sm ",
      className
    )}
    {...props}
  >
    {children}
  </blockquote>
);

const CustomUl = ({
  children,
  className,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
}) => (
  <ul
    className={cn(
      "list-disc font-inter list-outside ml-6 my-4 space-y-2",
      "text-[rgb(var(--foreground))]",
      className
    )}
    {...props}
  >
    {children}
  </ul>
);

const CustomLi = ({
  children,
  className,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
}) => (
  <li className={cn("pl-2 font-inter leading-relaxed", className)} {...props}>
    {children}
  </li>
);

const CustomOl = ({
  children,
  className,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
}) => (
  <ol
    className={cn(
      "list-decimal  font-inter list-outside ml-6 my-4 space-y-2",
      "text-[rgb(var(--foreground))]",
      className
    )}
    {...props}
  >
    {children}
  </ol>
);

const CustomLink = ({
  children,
  className,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
}) => (
  <a
    className={cn(
      "text-[rgb(var(--foreground))] font-medium font-inter ",
      className
    )}
    {...props}
  >
    {children}
  </a>
);

const CustomCode = ({
  children,
  className,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
}) => (
  <code
    className={cn(
      " text-[rgb(var(--foreground))] ",
      "font-inter text-sm font-semibold  ",
      "whitespace-pre-wrap ",

      className
    )}
    {...props}
  >
    {children}
  </code>
);

const CustomPre = ({
  children,
  className,
  ...props
}: {
  children?: React.ReactNode;
  className?: string;
}) => (
  <pre
    className={cn(
      "border border-dashed border-[rgb(var(--foreground))] rounded-lg ",
      "p-4 my-6",
      "overflow-x-auto",

      className
    )}
    {...props}
  >
    {children}
  </pre>
);
const CustomHr = ({ className, ...props }: { className?: string }) => (
  <hr
    className={cn(
      "my-8 border-0",
      "h-px bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200",
      "shadow-sm",
      className
    )}
    {...props}
  />
);

export const mdxComponents: MDXComponents = {
  h1: CustomH1,
  h2: CustomH2,
  h3: CustomH3,
  p: CustomP,
  blockquote: CustomBlockquote,
  ul: CustomUl,
  li: CustomLi,
  ol: CustomOl,
  a: CustomLink,
  code: CustomCode,
  pre: CustomPre,
  hr: CustomHr,
};
