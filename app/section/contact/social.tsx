import { FileUser } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const SocialLinks = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/suparna-adhikari-b78b46176/",
    icon: <FaLinkedinIn size={22} />,
    handle: "/suparna",
  },
  {
    name: "GitHub",
    url: "https://github.com/sup25",
    icon: <FaGithub size={22} />,
    handle: "/sup25",
  },
  {
    name: "Resume",
    url: "https://docs.google.com/document/d/1Xp8EGjwug3os5o-FwqaYJzM7p6TDC0x4PdmqAACLBuo/edit?tab=t.0",
    icon: <FileUser size={22} />,
    handle: "view cv",
  },
];

const Social = () => (
  <div className="mt-8">
    <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-3 font-inter">
      Find me on
    </p>
    <div className="grid grid-cols-3 gap-3">
      {SocialLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          aria-label={link.name}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center gap-2.5 px-3 py-4 rounded-xl border border-gray-200 bg-white hover:border-red-200 hover:bg-red-50 transition-all duration-200"
        >
          <div className="w-11 h-11 rounded-xl border border-red-100 bg-red-50 text-red-600 flex items-center justify-center group-hover:bg-red-100 group-hover:border-red-200 transition-colors duration-200">
            {link.icon}
          </div>
          <span className="text-[13px] font-medium text-gray-800">
            {link.name}
          </span>
          <span className="text-[11px] text-gray-400">{link.handle}</span>
          <span className="text-[11px] text-red-500">↗</span>
        </a>
      ))}
    </div>
  </div>
);

export default Social;
