"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Mail, Github, Linkedin, Send, Check } from "lucide-react";
import { MagneticButton } from "@/components/effects/MagneticButton";

const githubProfile = "https://github.com/harishkathiravan-sys";
const linkedinProfile = "https://www.linkedin.com/in/harish-kathiravan-05b229304";

function FloatingInput({
  name, label, type, value, onChange, onFocus, onBlur, focused,
}: {
  name: string; label: string; type: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: () => void; onBlur: () => void; focused: boolean;
}) {
  const isActive = focused || value.length > 0;
  return (
    <div className="relative">
      <input
        name={name} type={type} value={value} onChange={onChange}
        onFocus={onFocus} onBlur={onBlur}
        className="w-full rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-5 pb-3.5 pt-6 text-[14px] text-white/90 outline-none transition-all duration-300 placeholder:text-transparent focus:border-[rgba(255,255,255,0.16)] focus:bg-[rgba(255,255,255,0.05)] focus:shadow-[0_0_0_3px_rgba(255,255,255,0.03)]"
        placeholder={label}
      />
      <label
        className="pointer-events-none absolute left-5 origin-left text-[13px] font-medium transition-all duration-200"
        style={{
          top: isActive ? "8px" : "16px",
          fontSize: isActive ? "10px" : "13px",
          color: focused ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.22)",
          letterSpacing: isActive ? "0.06em" : "0",
          textTransform: isActive ? "uppercase" : "none",
        }}
      >
        {label}
      </label>
    </div>
  );
}

function FloatingTextarea({
  name, label, value, onChange, onFocus, onBlur, focused,
}: {
  name: string; label: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus: () => void; onBlur: () => void; focused: boolean;
}) {
  const isActive = focused || value.length > 0;
  return (
    <div className="relative">
      <textarea
        name={name} rows={5} value={value} onChange={onChange}
        onFocus={onFocus} onBlur={onBlur}
        className="w-full resize-none rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.03)] px-5 pb-3.5 pt-6 text-[14px] text-white/90 outline-none transition-all duration-300 placeholder:text-transparent focus:border-[rgba(255,255,255,0.16)] focus:bg-[rgba(255,255,255,0.05)] focus:shadow-[0_0_0_3px_rgba(255,255,255,0.03)]"
        placeholder={label}
      />
      <label
        className="pointer-events-none absolute left-5 origin-left text-[13px] font-medium transition-all duration-200"
        style={{
          top: isActive ? "8px" : "16px",
          fontSize: isActive ? "10px" : "13px",
          color: focused ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.22)",
          letterSpacing: isActive ? "0.06em" : "0",
          textTransform: isActive ? "uppercase" : "none",
        }}
      >
        {label}
      </label>
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
        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.3em] text-white/25">
          Contact
        </p>
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(1.75rem,4vw,3.25rem)] leading-tight font-semibold tracking-[-0.02em] text-white/90">
          Open to AI engineering,
          <br />
          <span className="text-gradient-static">product &amp; full stack opportunities.</span>
        </h2>
      </motion.div>

      <div className="mt-16 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Contact info */}
        <motion.div
          className="glass-card rounded-3xl p-9"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
        >
          <p className="text-[15px] leading-relaxed text-white/40">
            Let&apos;s build something intelligent.
          </p>

          <div className="mt-8 space-y-2">
            {[
              { icon: Mail, label: "harishkathiravan93@gmail.com", href: "https://mail.google.com/mail/?view=cm&fs=1&to=harishkathiravan93@gmail.com", external: false },
              { icon: Github, label: "github.com/harishkathiravan-sys", href: githubProfile, external: true },
              { icon: Linkedin, label: "linkedin.com/in/harish-kathiravan", href: linkedinProfile, external: true },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                  className="group flex items-center gap-3.5 rounded-2xl border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.02)] px-5 py-4 transition-all duration-300 hover:border-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.05)]"
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.06, ease: [0.23, 1, 0.32, 1] }}
                >
                  <Icon className="h-4 w-4 text-white/30 transition-all duration-300 group-hover:text-white/50" />
                  <span className="text-[13px] text-white/40 transition-colors duration-300 group-hover:text-white/65">
                    {item.label}
                  </span>
                </motion.a>
              );
            })}
          </div>

          <div className="mt-8 h-[1px] bg-[rgba(255,255,255,0.06)]" />
          <p className="mt-5 text-[11px] text-white/18">
            Typically respond within 24 hours.
          </p>
        </motion.div>

        {/* Contact form */}
        <motion.div
          className="glass-card rounded-3xl p-9"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                className="space-y-4"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <FloatingInput name="name" label="Name" type="text" value={formState.name} onChange={handleChange} onFocus={() => setFocusedField("name")} onBlur={() => setFocusedField(null)} focused={focusedField === "name"} />
                  <FloatingInput name="email" label="Email" type="email" value={formState.email} onChange={handleChange} onFocus={() => setFocusedField("email")} onBlur={() => setFocusedField(null)} focused={focusedField === "email"} />
                </div>
                <FloatingInput name="subject" label="Subject" type="text" value={formState.subject} onChange={handleChange} onFocus={() => setFocusedField("subject")} onBlur={() => setFocusedField(null)} focused={focusedField === "subject"} />
                <FloatingTextarea name="message" label="Message" value={formState.message} onChange={handleChange} onFocus={() => setFocusedField("message")} onBlur={() => setFocusedField(null)} focused={focusedField === "message"} />
                <div className="pt-2">
                  <MagneticButton ripple>
                    <button type="submit" className="cta-premium text-[13px]">
                      <Send className="h-3.5 w-3.5 opacity-50" />
                      Send Message
                    </button>
                  </MagneticButton>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                className="flex flex-col items-center justify-center py-16 text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)]">
                  <Check className="h-7 w-7 text-white/60" strokeWidth={1.5} />
                </div>
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-white/85">
                  Message Sent
                </h3>
                <p className="mt-2 text-[13px] text-white/35">
                  Thank you for reaching out. I&apos;ll get back to you soon.
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-8 text-[11px] font-medium uppercase tracking-[0.1em] text-white/25 transition-colors duration-300 hover:text-white/50"
                >
                  Send Another Message
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
