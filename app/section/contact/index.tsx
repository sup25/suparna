"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "../sectionHeader";
import { FaBolt, FaEnvelope, FaLocationArrow } from "react-icons/fa";
import Social from "./social";
import emailjs from "@emailjs/browser";
import Turnstile from "react-turnstile";
gsap.registerPlugin(ScrollTrigger);

type FormState = {
  name: string;
  email: string;
  message: string;
};

type Status = "idle" | "sending" | "success" | "error";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [token, setToken] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      tl.from(".section-header", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          ".contact-info-item",
          {
            x: -30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "power2.out",
          },
          "-=0.5",
        )
        .from(
          ".contact-form-wrap",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.6",
        )
        .from(
          ".field-wrap",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out",
          },
          "-=0.6",
        )
        .fromTo(
          ".submit-btn",
          { scale: 0.9, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
            clearProps: "all",
          },
          "-=0.3",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if ((e.currentTarget as any).company?.value) return;
    if (!token) {
      alert("Please verify you are human.");
      return;
    }
    setStatus("sending");

    gsap.to(".submit-btn", {
      scale: 0.96,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      );

      setStatus("success");
      setForm({ name: "", email: "", message: "" });

      gsap.from(".success-msg", { y: 10, opacity: 0, duration: 0.5 });
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      {/* Curved SVG separator */}
      {/* <div className="w-full overflow-hidden -mb-[2px]">
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="w-full h-[80px]"
        >
          <path
            d="M0,0 C360,80 1080,80 1440,0 L1440,80 L0,80 Z"
            className="fill-gray-100"
          />
        </svg>
      </div> */}

      <div className="section">
        <section
          ref={sectionRef}
          id="contact"
          className="container mx-auto px-4 py-20"
        >
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-20">
            {/* Left info column */}
            <div ref={infoRef}>
              <SectionHeader title="Let's Talk" />
              <p className="font-inter text-gray-500 mb-12 md:max-w-[420px] leading-relaxed">
                Got a project in mind, or just want to say hi? My inbox is
                always open. I'll get back to you within 24 hours.
              </p>

              {/* Info rows — minimal */}
              <div className="flex flex-col gap-2 mb-9 font-inter">
                {[
                  {
                    key: "Email",
                    val: (
                      <a
                        href="mailto:asuparna25@gmail.com"
                        className="text-red-600 border-b border-red-200 pb-px hover:border-red-400 transition-colors"
                      >
                        asuparna25@gmail.com
                      </a>
                    ),
                  },
                  { key: "Based in", val: "Kathmandu, Nepal" },
                  { key: "Replies in", val: "24 hours" },
                ].map((item, i) => (
                  <div key={i} className="flex items-baseline gap-4 text-sm">
                    <span className="text-gray-400 w-24 shrink-0">
                      {item.key}
                    </span>
                    <span className="text-gray-700">{item.val}</span>
                  </div>
                ))}
              </div>

              <hr className="border-t border-gray-100 mb-7" />

              <Social />
            </div>

            {/* Right form column */}
            <div className="bg-white rounded-2xl shadow-md contact-form-wrap overflow-hidden">
              <form onSubmit={handleSubmit}>
                {/* All padded fields live here */}
                <div className="p-8 sm:p-11 pb-6">
                  <div className="grid md:grid-cols-2 gap-5">
                    <input
                      type="text"
                      name="company"
                      className="hidden"
                      autoComplete="off"
                    />

                    <div className="flex flex-col gap-2 field-wrap">
                      <label
                        htmlFor="name"
                        className="text-xs uppercase tracking-widest text-gray-400 font-inter"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="border border-gray-200 rounded-xl p-3 text-sm font-bricolageoutline-none focus:border-red-400 focus:ring-1 focus:ring-red-50 transition"
                      />
                    </div>

                    <div className="flex flex-col gap-2 field-wrap">
                      <label
                        htmlFor="email"
                        className="text-xs uppercase tracking-widest text-gray-400 font-inter"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="border border-gray-200 rounded-xl p-3 text-sm font-bricolageoutline-none focus:border-red-400 focus:ring-1 focus:ring-red-50 transition"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 mt-5 field-wrap">
                    <label
                      htmlFor="message"
                      className="text-xs uppercase tracking-widest text-gray-400 font-inter"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project…"
                      value={form.message}
                      onChange={handleChange}
                      required
                      className="border border-gray-200 rounded-xl p-3 text-sm font-bricolageoutline-none focus:border-red-400 focus:ring-1 focus:ring-red-50 resize-none h-32 transition"
                    />
                  </div>
                </div>

                <div className=" px-0 sm:px-11 field-wrap">
                  <Turnstile
                    sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                    onVerify={(t) => setToken(t)}
                    size="flexible"
                    className="w-full bg-white"
                  />
                </div>

                {/* Footer bar — dark strip with the submit button */}
                <div className="px-8 sm:px-11 py-5 bg-white ">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full px-8 py-4 bg-black text-white font-bricolagetext-sm rounded-xl border-2 border-black hover:bg-white hover:text-black hover:shadow-md transition-all duration-200 submit-btn"
                  >
                    {status === "sending" ? "Sending…" : "Send Message →"}
                  </button>

                  {status === "success" && (
                    <div className="flex items-center gap-3 mt-4 p-4 bg-green-50 border border-green-200 text-green-600 rounded-xl success-msg">
                      <span>✓</span>
                      <span>Message sent! I'll get back to you soon.</span>
                    </div>
                  )}
                  {status === "error" && (
                    <div className="flex items-center gap-3 mt-4 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl error-msg">
                      <span>✕</span>
                      <span>Something went wrong. Please try again.</span>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>

      {/*  <div className="w-full overflow-hidden -mt-[2px]">
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="w-full h-[80px]"
        >
          <path
            d="M0,80 C360,0 1080,0 1440,80 L1440,0 L0,0 Z"
            className="fill-gray-100"
          />
        </svg>
      </div> */}
    </>
  );
}
