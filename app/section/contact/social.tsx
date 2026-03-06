import { FileUser } from "lucide-react";
import React from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const SocialLinks = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/suparna-adhikari-b78b46176/",
    icon: <FaLinkedinIn size={16} />,
    label: "in",
  },
  {
    name: "GitHub",
    url: "https://github.com/sup25",
    icon: <FaGithub size={16} />,
    label: "gh",
  },
  {
    name: "Resume",
    url: "https://drive.google.com/file/d/11AW3m20K0-h-dozKPpMKaAWuNIGcet8x/view",
    icon: <FileUser size={16} />,
    label: "cv",
  },
];

const Social = () => {
  return (
    <>
      <style>{`
        

        .social-wrapper {
          display: flex;
          gap: 10px;
          margin-top: 2.5rem;
          align-items: center;
        }

        .social-link {
          position: relative;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px 7px 10px;
          border-radius: 4px;
          border: 1px solid rgba(220, 38, 38, 0.25);
          background: transparent;
          color: #9ca3af;
          text-decoration: none;
          
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: lowercase;
          transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }

        .social-link::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(220, 38, 38, 0.08), transparent);
          opacity: 0;
          transition: opacity 0.22s ease;
        }

        .social-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0%;
          height: 1.5px;
          background: #dc2626;
          transition: width 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .social-link:hover {
          border-color: rgba(220, 38, 38, 0.6);
          color: #ef4444;
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(220, 38, 38, 0.12), 0 0 0 1px rgba(220, 38, 38, 0.08);
        }

        .social-link:hover::before {
          opacity: 1;
        }

        .social-link:hover::after {
          width: 100%;
        }

        .social-link:hover .social-icon {
          transform: scale(1.15) rotate(-4deg);
          color: #ef4444;
        }

        .social-icon {
          transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.22s ease;
          flex-shrink: 0;
          position: relative;
        }

        .social-label {
          position: relative;
          font-weight: 700;
        }

        /* staggered entrance */
        .social-link:nth-child(1) { animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both; }
        .social-link:nth-child(2) { animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.18s both; }
        .social-link:nth-child(3) { animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) 0.26s both; }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="social-wrapper">
        {SocialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            aria-label={link.name}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <span className="social-icon">{link.icon}</span>
            <span className="social-label">{link.label}</span>
          </a>
        ))}
      </div>
    </>
  );
};

export default Social;
