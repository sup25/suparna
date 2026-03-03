import { FileUser } from "lucide-react";
import React from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const SocialLinks = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/suparna-adhikari-b78b46176/",
    icon: <FaLinkedinIn size={24} />, // use smaller size inside circle
  },
  {
    name: "GitHub",
    url: "https://github.com/sup25",
    icon: <FaGithub size={24} />,
  },
  {
    name: "Resume",
    url: "https://drive.google.com/file/d/15pqyYSRXEptVnbe7giPv-Wj6aZke8whj/view",
    icon: <FileUser size={24} />,
  },
];

const Social = () => {
  return (
    <div className="flex gap-3 mt-10">
      {SocialLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          aria-label={link.name}
          target="_blank"
          rel="noopener noreferrer"
          className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 text-sm transition-colors duration-200 hover:border-red-300 hover:text-red-600 hover:bg-red-50"
        >
          {link.icon}
        </a>
      ))}
    </div>
  );
};

export default Social;
