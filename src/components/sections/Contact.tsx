"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Mail, Github, Linkedin, Send, Check, ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/effects/MagneticButton";

const githubProfile = "https://github.com/harishkathiravan-sys";
const linkedinProfile = "https://www.linkedin.com/in/harish-kathiravan-05b229304";

function FloatingInput({
  name,
  label,
  type,
  value,
  onChange,
  onFocus,
  onBlur,
  focused,
}: {
  name: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  focused: boolean;
}) {
  const isActive = focused || value.length > 0;

  return (
    <div className="relative">
      <div className="relative">
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          className="peer w-full rounded-2xl border border-white/[0.06] bg-white/[0.03] px-5 pb-3.5 pt-6 text-[14px] text-white/90 outline-none transition-all duration-500 placeholder:text-transparent focus:border-violet-500/40 focus:bg-white/[0.05] focus:shadow-[0_0_0_4px_rgba(139,92,246,0.1),0_0_40px_rgba(139,92,246,0.06)]"
          placeholder={label}
        />
        {/* Floating label */}
        <label
          className="pointer-events-none absolute left-5 origin-left text-[13px] font-medium transition-all duration-300"
          style={{
            top: isActive ? "10px" : "17px",
            fontSize: isActive ? "11px" : "13px",
            color: focused ? "rgba(192, 132, 252, 0.7)" : "rgba(255,255,255,0.25)",
            letterSpacing: isActive ? "0.05em" : "0",
            textTransform: isActive ? "uppercase" : "none",
          }}
        >
          {label}
        </label>
        {/* Bottom accent line */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 h-[2px] rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-400 to-cyan-400 transition-all duration-600"
          style={{
            width: focused ? "100%" : "0%",
            opacity: focused ? 1 : 0,
            boxShadow: focused ? "0 0 16px rgba(139, 92, 246, 0.4), 0 0 40px rgba(34, 211, 238, 0.15)" : "none",
          }}
        />
      </div>
    </div>
  );
}

function FloatingTextarea({
  name,
  label,
  value,
  onChange,
  onFocus,
  onBlur,
  focused,
}: {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus: () => void;
  onBlur: () => void;
  focused: boolean;
}) {
  const isActive = focused || value.length > 0;

  return (
    <div className="relative">
      <div className="relative">
        <textarea
          name={name}
          rows={5}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          className="peer w-full resize-none rounded-2xl border border-white/[0.06] bg-white/[0.03] px-5 pb-3.5 pt-6 text-[14px] text-white/90 outline-none transition-all duration-500 placeholder:text-transparent focus:border-violet-500/40 focus:bg-white/[0.05] focus:shadow-[0_0_0_4px_rgba(139,92,246,0.1),0_0_40px_rgba(139,92,246,0.06)]"
          placeholder={label}
        />
        {/* Floating label */}
        <label
          className="pointer-events-none absolute left-5 origin-left text-[13px] font-medium transition-all duration-300"
          style={{
            top: isActive ? "10px" : "17px",
            fontSize: isActive ? "11px" : "13px",
            color: focused ? "rgba(192, 132, 252, 0.7)" : "rgba(255,255,255,0.25)",
            letterSpacing: isActive ? "0.05em" : "0",
            textTransform: isActive ? "uppercase" : "none",
          }}
        >
          {label}
        </label>
        {/* Bottom accent line */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 h-[2px] rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-400 to-cyan-400 transition-all duration-600"
          style={{
            width: focused ? "100%" : "0%",
            opacity: focused ? 1 : 0,
            boxShadow: focused ? "0 0 16px rgba(139, 92, 246, 0.4), 0 0 40px rgba(34, 211, 238, 0.15)" : "none",
          }}
        />
      </div>
    </div>
  );
}

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "" });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormState({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section id="contact" ref={ref} className="relative py-32 sm:py-40">
      <div className="section-divider mb-24" />

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

      <div className="mt-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Contact info */}
        <motion.div
          className="glass-card gradient-border rounded-3xl p-9 sm:p-11"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
        >
          <p className="text-[15px] leading-relaxed text-white/45">
            Let&apos;s build something intelligent.
          </p>

          <div className="mt-8 space-y-3">
            {[
              {
                icon: Mail,
                label: "harishkathiravan93@gmail.com",
                href: "https://mail.google.com/mail/?view=cm&fs=1&to=harishkathiravan93@gmail.com",
                color: "text-cyan-400/70",
                glowColor: "rgba(6, 182, 212, 0.15)",
              },
              {
                icon: Github,
                label: "github.com/harishkathiravan-sys",
                href: githubProfile,
                color: "text-violet-400/70",
                glowColor: "rgba(139, 92, 246, 0.15)",
                external: true,
              },
              {
                icon: Linkedin,
                label: "linkedin.com/in/harish-kathiravan",
                href: linkedinProfile,
                color: "text-cyan-400/70",
                glowColor: "rgba(6, 182, 212, 0.15)",
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
                  className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/[0.04] bg-white/[0.02] px-6 py-5 transition-all duration-500 hover:border-white/[0.1] hover:bg-white/[0.05]"
                  initial={{ opacity: 0, y: 14 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.2 + i * 0.08,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                >
                  {/* Hover glow background */}
                  <div
                    className="pointer-events-none absolute -left-8 top-1/2 h-24 w-24 -translate-y-1/2 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                    style={{ background: item.glowColor }}
                  />
                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110" style={{ background: "rgba(255,255,255,0.04)" }}>
                    <Icon className={`h-4.5 w-4.5 transition-all duration-300 group-hover:rotate-[-8deg] group-hover:scale-110 ${item.color}`} />
                  </div>
                  <span className="relative text-[13px] text-white/50 transition-colors duration-300 group-hover:text-white/80">
                    {item.label}
                  </span>
                  <ArrowRight className="relative ml-auto h-3.5 w-3.5 text-white/0 transition-all duration-300 group-hover:text-white/30 group-hover:translate-x-0.5" />
                </motion.a>
              );
            })}
          </div>

          {/* Decorative divider */}
          <div className="mt-8 h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

          <p className="mt-6 text-[12px] text-white/20">
            Typically respond within 24 hours.
          </p>
        </motion.div>

        {/* Contact form */}
        <motion.div
          className="glass-card gradient-border rounded-3xl p-9 sm:p-11"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                className="space-y-5"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10, transition: { duration: 0.3 } }}
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <FloatingInput
                    name="name"
                    label="Name"
                    type="text"
                    value={formState.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    focused={focusedField === "name"}
                  />
                  <FloatingInput
                    name="email"
                    label="Email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    focused={focusedField === "email"}
                  />
                </div>

                <FloatingInput
                  name="subject"
                  label="Subject"
                  type="text"
                  value={formState.subject}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("subject")}
                  onBlur={() => setFocusedField(null)}
                  focused={focusedField === "subject"}
                />

                <FloatingTextarea
                  name="message"
                  label="Message"
                  value={formState.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  focused={focusedField === "message"}
                />

                <div className="pt-2">
                  <MagneticButton ripple>
                    <button
                      type="submit"
                      className="cta-premium text-[13px]"
                    >
                      <Send className="h-3.5 w-3.5" />
                      Send Message
                    </button>
                  </MagneticButton>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                className="flex flex-col items-center justify-center py-12 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              >
                {/* Success circle */}
                <motion.div
                  className="mb-6 flex h-20 w-20 items-center justify-center rounded-full"
                  style={{
                    background: "linear-gradient(135deg, rgba(52, 211, 153, 0.15), rgba(6, 182, 212, 0.1))",
                    boxShadow: "0 0 60px rgba(52, 211, 153, 0.15), inset 0 0 30px rgba(52, 211, 153, 0.05)",
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 12 }}
                  >
                    <Check className="h-8 w-8 text-emerald-400" strokeWidth={2.5} />
                  </motion.div>
                </motion.div>

                <motion.h3
                  className="font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-white/90"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  Message Sent
                </motion.h3>
                <motion.p
                  className="mt-2 text-[14px] text-white/40"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  Thank you for reaching out. I&apos;ll get back to you soon.
                </motion.p>

                <motion.button
                  type="button"
                  onClick={handleReset}
                  className="mt-8 text-[12px] font-medium uppercase tracking-[0.15em] text-violet-300/50 transition-colors duration-300 hover:text-violet-300/80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  Send Another Message
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
