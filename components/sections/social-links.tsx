import { FileUser } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { site } from "@/content/site";

const links = [
  {
    name: "LinkedIn",
    url: site.socials.linkedin,
    icon: <FaLinkedinIn size={20} />,
    handle: "/suparna-adhikari",
  },
  {
    name: "GitHub",
    url: site.socials.github,
    icon: <FaGithub size={20} />,
    handle: "/sup25",
  },
  {
    name: "Résumé",
    url: site.socials.resume,
    icon: <FileUser size={20} />,
    handle: "View CV",
  },
];

export default function SocialLinks() {
  return (
    <div className="mt-8">
      <p className="eyebrow mb-3">Find me on</p>
      <ul className="grid grid-cols-3 gap-3">
        {links.map((link) => (
          <li key={link.name}>
            <a
              href={link.url}
              aria-label={link.name}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col items-center gap-2 rounded-xl border border-line bg-bg-elevated px-2 py-4 transition-all duration-200 hover:border-accent-border hover:bg-accent-soft"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-accent-border bg-accent-soft text-accent transition-colors duration-200 group-hover:bg-white">
                {link.icon}
              </span>
              <span className="font-inter text-[13px] font-medium text-fg">
                {link.name}
              </span>
              <span className="text-center font-inter text-[11px] text-fg-subtle">
                {link.handle}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
