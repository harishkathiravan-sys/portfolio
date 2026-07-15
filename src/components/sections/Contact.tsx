"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Github, Linkedin, Send } from "lucide-react";
import { MagneticButton } from "@/components/effects/MagneticButton";

const githubProfile = "https://github.com/harishkathiravan-sys";
const linkedinProfile = "https://www.linkedin.com/in/harish-kathiravan-05b229304";

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" ref={ref} className="relative py-28 sm:py-36">
      <div className="section-divider mb-20" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      >
        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.4em] text-violet-300/50">
          Contact
        </p>
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(1.75rem,4vw,3.25rem)] leading-tight font-semibold tracking-[-0.02em] text-white/90">
          Open to AI engineering,
          <br />
          <span className="text-gradient-static">product &amp; full stack opportunities.</span>
        </h2>
      </motion.div>

      <div className="mt-14 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Contact info */}
        <motion.div
          className="glass-card gradient-border rounded-3xl p-8 sm:p-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
        >
          <p className="text-[15px] text-white/45">
            Let&apos;s build something intelligent.
          </p>

          <div className="mt-6 space-y-3">
            {[
              {
                icon: Mail,
                label: "harishkathiravan93@gmail.com",
                href: "https://mail.google.com/mail/?view=cm&fs=1&to=harishkathiravan93@gmail.com",
                color: "text-cyan-400/70",
              },
              {
                icon: Github,
                label: "github.com/harishkathiravan-sys",
                href: githubProfile,
                color: "text-violet-400/70",
                external: true,
              },
              {
                icon: Linkedin,
                label: "linkedin.com/in/harish-kathiravan",
                href: linkedinProfile,
                color: "text-cyan-400/70",
                external: true,
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                  className="group flex items-center gap-3.5 rounded-2xl border border-white/[0.04] bg-white/[0.02] px-5 py-4 transition-all duration-300 hover:border-white/[0.08] hover:bg-white/[0.04]"
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.2 + i * 0.08,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                >
                  <Icon className={`h-4 w-4 transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110 ${item.color}`} />
                  <span className="text-[13px] text-white/50 transition-colors duration-300 group-hover:text-white/70">
                    {item.label}
                  </span>
                </motion.a>
              );
            })}
          </div>
        </motion.div>

        {/* Contact form */}
        <motion.div
          className="glass-card gradient-border rounded-3xl p-8 sm:p-10"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { name: "name", label: "Name", placeholder: "Your name", type: "text" },
                { name: "email", label: "Email", placeholder: "you@company.com", type: "email" },
              ].map((field) => (
                <div key={field.name} className="relative">
                  <label className="mb-1.5 block text-[12px] font-medium text-white/30">
                    {field.label}
                  </label>
                  <input
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formState[field.name as keyof typeof formState]}
                    onChange={handleChange}
                    onFocus={() => setFocusedField(field.name)}
                    onBlur={() => setFocusedField(null)}
                    className="premium-input"
                  />
                  <div
                    className="pointer-events-none absolute bottom-0 left-0 h-[2px] rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-500"
                    style={{
                      width: focusedField === field.name ? "100%" : "0%",
                      opacity: focusedField === field.name ? 1 : 0,
                      boxShadow: focusedField === field.name ? "0 0 12px rgba(139, 92, 246, 0.3)" : "none",
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="relative">
              <label className="mb-1.5 block text-[12px] font-medium text-white/30">
                Subject
              </label>
              <input
                name="subject"
                type="text"
                placeholder="Project, role, or collaboration"
                value={formState.subject}
                onChange={handleChange}
                onFocus={() => setFocusedField("subject")}
                onBlur={() => setFocusedField(null)}
                className="premium-input"
              />
              <div
                className="pointer-events-none absolute bottom-0 left-0 h-[2px] rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-500"
                style={{
                  width: focusedField === "subject" ? "100%" : "0%",
                  opacity: focusedField === "subject" ? 1 : 0,
                  boxShadow: focusedField === "subject" ? "0 0 12px rgba(139, 92, 246, 0.3)" : "none",
                }}
              />
            </div>

            <div className="relative">
              <label className="mb-1.5 block text-[12px] font-medium text-white/30">
                Message
              </label>
              <textarea
                name="message"
                rows={5}
                placeholder="Tell me what you're building..."
                value={formState.message}
                onChange={handleChange}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
                className="premium-input resize-none"
              />
              <div
                className="pointer-events-none absolute bottom-0 left-0 h-[2px] rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-500"
                style={{
                  width: focusedField === "message" ? "100%" : "0%",
                  opacity: focusedField === "message" ? 1 : 0,
                  boxShadow: focusedField === "message" ? "0 0 12px rgba(139, 92, 246, 0.3)" : "none",
                }}
              />
            </div>

            <MagneticButton ripple>
              <button
                type="submit"
                className="cta-premium text-[13px]"
              >
                <Send className="h-3.5 w-3.5" />
                Send Message
              </button>
            </MagneticButton>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
