import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import {
  breadcrumbSchema,
  buildMetadata,
  caseStudySchema,
  jsonLdGraph,
} from "@/lib/seo";
import { projects, projectBySlug } from "@/content/projects";
import { experience } from "@/content/experience";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params) {
  const { slug } = await params;
  const project = projectBySlug(slug);

  if (!project) {
    return buildMetadata({
      title: "Project not found",
      description: "This project does not exist.",
      path: `/work/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: `${project.title}: ${project.type}`,
    description: project.summary,
    path: `/work/${project.slug}`,
    image: project.image,
  });
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const project = projectBySlug(slug);

  if (!project) notFound();

  const role = experience.find((r) => r.id === project.roleId);
  const others = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  const facts = [
    { label: "Year", value: project.year },
    { label: "Type", value: project.type },
    {
      label: "Context",
      value: role ? `${role.title}, ${role.company}` : "Personal project",
    },
  ];

  return (
    <>
      <JsonLd
        data={jsonLdGraph(
          caseStudySchema(project),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Work", path: "/#works" },
            { name: project.title, path: `/work/${project.slug}` },
          ]),
        )}
      />

      <div className="section pt-32">
        <article className="container pb-section">
          <Link
            href="/#works"
            className="mb-10 inline-flex items-center gap-2 font-inter text-sm font-medium text-fg-muted transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All work
          </Link>

          {/* Header */}
          <header className="mb-12">
            <p className="eyebrow mb-4">{project.type}</p>

            <h1 className="max-w-4xl font-bricolage text-display-sm font-bold leading-[1.05] tracking-tight text-fg md:text-display-md">
              {project.title}
            </h1>

            <p className="mt-6 max-w-prose font-inter text-lg leading-relaxed text-fg-muted">
              {project.summary}
            </p>

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3 font-inter text-sm font-semibold text-bg-elevated transition-colors hover:bg-accent"
              >
                Visit live site
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            )}
          </header>

          {/* Cover */}
          <div className="relative mb-14 aspect-[16/9] overflow-hidden rounded-2xl border border-line bg-bg-subtle">
            <Image
              src={project.image}
              alt={`${project.title}, ${project.type}`}
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              priority
              className="object-cover"
            />
          </div>

          <div className="grid gap-14 lg:grid-cols-[1fr_16rem] lg:gap-20">
            {/* Body */}
            <div className="min-w-0">
              <section className="mb-12">
                <h2 className="mb-5 font-bricolage text-2xl font-bold text-fg">
                  The context
                </h2>
                <p className="max-w-prose font-inter text-[0.975rem] leading-[1.8] text-fg-muted">
                  {project.caseStudy.context}
                </p>
              </section>

              <section className="mb-12">
                <h2 className="mb-5 font-bricolage text-2xl font-bold text-fg">
                  What the work involved
                </h2>
                <ul className="max-w-prose space-y-3.5">
                  {project.caseStudy.work.map((item, i) => (
                    <li
                      key={i}
                      className="relative pl-6 font-inter text-[0.975rem] leading-[1.8] text-fg-muted"
                    >
                      <span
                        className="absolute left-0 top-[0.7em] h-1.5 w-1.5 rounded-full bg-accent"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              {project.caseStudy.outcome && (
                <section className="mb-12">
                  <h2 className="mb-5 font-bricolage text-2xl font-bold text-fg">
                    Outcome
                  </h2>
                  <p className="max-w-prose rounded-r-xl border-l-4 border-accent bg-accent-soft py-5 pl-6 pr-5 font-inter text-[0.975rem] leading-[1.8] text-fg">
                    {project.caseStudy.outcome}
                  </p>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <dl className="space-y-6 rounded-2xl border border-line bg-bg-elevated p-6">
                {facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="eyebrow mb-2">{fact.label}</dt>
                    <dd className="font-inter text-sm text-fg">{fact.value}</dd>
                  </div>
                ))}

                <div>
                  <dt className="eyebrow mb-2.5">Stack</dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {project.caseStudy.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-line bg-bg-subtle px-2 py-0.5 font-inter text-[0.7rem] text-fg-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </aside>
          </div>

          {/* More work */}
          <section className="mt-20 border-t border-line pt-12">
            <h2 className="mb-8 font-bricolage text-2xl font-bold text-fg">
              More work
            </h2>
            <ul className="grid gap-4 sm:grid-cols-3">
              {others.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/work/${other.slug}`}
                    className="group block rounded-xl border border-line bg-bg-elevated p-5 transition-colors hover:border-accent-border"
                  >
                    <p className="eyebrow mb-2">{other.type}</p>
                    <p className="font-bricolage text-base font-semibold text-fg transition-colors group-hover:text-accent">
                      {other.title}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </article>
      </div>
    </>
  );
}
