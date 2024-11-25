"use client";

import { Suspense } from "react";
import EsewaRemixBlog from "@/app/(__blogs)/esewa-remix";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug.join("/") : params.slug;

  console.log("Params:", slug);

  const blogComponents: Record<string, React.ReactNode> = {
    "esewa-remix": <EsewaRemixBlog />,
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      {blogComponents[slug || ""] || <p>No blog found</p>}
    </Suspense>
  );
}
