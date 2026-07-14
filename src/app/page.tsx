"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  Github,
  Globe,
  Linkedin,
  Mail,
  MoonStar,
  Download,
  SunMedium,
  Sparkles,
  Cpu,
  Brain,
  Eye,
  TerminalSquare,
  Database,
  Smartphone,
  Layers3,
  Wrench,
  Code2,
  Menu,
  X,
  ShieldCheck,
  ChartSpline,
  BadgeCheck,
  Rocket,
} from "lucide-react";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Stats", href: "#stats" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

const githubProfile = "https://github.com/harishkathiravan-sys";
const linkedinProfile = "https://www.linkedin.com/in/harish-kathiravan-05b229304";
const resumePath = "/Harish_Kathiravan_AI_Engineer_Resume.pdf";

const skillGroups = [
  {
    icon: Brain,
    title: "AI & ML",
    items: ["TensorFlow", "PyTorch", "Scikit-learn", "XGBoost", "SHAP", "LIME", "LangChain"],
  },
  {
    icon: Eye,
    title: "Computer Vision",
    items: ["OpenCV", "MediaPipe", "Image Processing", "Gesture Recognition", "Object Detection"],
  },
  {
    icon: TerminalSquare,
    title: "NLP",
    items: ["Text Classification", "Email Threat Detection", "LLMs", "Prompting", "Document Processing"],
  },
  {
    icon: Layers3,
    title: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    icon: Code2,
    title: "Backend",
    items: ["Node.js", "Express", "REST APIs", "Authentication", "System Design"],
  },
  {
    icon: Smartphone,
    title: "Mobile (Flutter)",
    items: ["Flutter", "Dart", "Cross-platform UX", "State Management"],
  },
  {
    icon: Database,
    title: "Databases",
    items: ["MongoDB", "PostgreSQL", "Firebase", "Prisma", "SQL"],
  },
  {
    icon: Wrench,
    title: "Tools",
    items: ["GitHub", "Docker", "Vercel", "Postman", "Figma", "Linux"],
  },
];

const projects = [
  {
    name: "EEG BOT",
    description:
      "Emotion-aware AI assistant that interprets EEG signals and explains predictions with SHAP, LIME, and LangChain-powered responses.",
    tech: ["EEG", "XGBoost", "SHAP", "LIME", "LangChain", "React", "Node.js"],
    github: githubProfile,
    demo: "#",
    metric: "Adaptive neuro-AI interface",
  },
  {
    name: "RajiniVision AI",
    description:
      "Real-time hand gesture recognition system built with MediaPipe and OpenCV for interactive computer vision experiences.",
    tech: ["MediaPipe", "OpenCV", "Computer Vision", "Python", "Real-time AI"],
    github: githubProfile,
    demo: "#",
    metric: "Live gesture interpretation",
  },
  {
    name: "MailShield AI",
    description:
      "AI-powered phishing and email threat detection platform using NLP and machine learning to surface risky content fast.",
    tech: ["NLP", "Machine Learning", "Threat Detection", "Text Analysis"],
    github: githubProfile,
    demo: "#",
    metric: "Defensive AI for inbox security",
  },
  {
    name: "Complaint Routing System",
    description:
      "Intelligent complaint classification engine that automatically routes cases to the right service pipeline using NLP.",
    tech: ["NLP", "Classification", "Automation", "Workflow Intelligence"],
    github: githubProfile,
    demo: "#",
    metric: "Faster support resolution",
  },
  {
    name: "TravelBuddy",
    description:
      "Flutter travel application with personalized recommendations, smart trip planning, and a mobile-first product experience.",
    tech: ["Flutter", "Dart", "Recommendations", "Trip Planning"],
    github: githubProfile,
    demo: "#",
    metric: "Personalized mobile travel companion",
  },
  {
    name: "KwikKart",
    description:
      "Full-stack e-commerce platform built with React, Node.js, Express, and MongoDB for end-to-end shopping workflows.",
    tech: ["React", "Node.js", "Express", "MongoDB", "E-commerce"],
    github: githubProfile,
    demo: "#",
    metric: "Scalable commerce foundation",
  },
];

const stats = [
  { label: "AI Projects", value: 12, suffix: "+" },
  { label: "Domains Built", value: 6, suffix: "+" },
  { label: "Production Systems", value: 4, suffix: "+" },
  { label: "Years Learning", value: 3, suffix: "+" },
];

const experience = [
  {
    role: "Web Development Intern",
    company: "GreenWill Techs",
    period: "Internship",
    points: [
      "Built responsive web interfaces with a production mindset and strong attention to user experience.",
      "Collaborated on feature development, UI polish, and bug fixes across the product surface.",
      "Worked with modern frontend tooling and learned to ship reliable user-facing improvements quickly.",
    ],
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const glowX = useTransform(progress, [0, 1], [0, 160]);
  const glowY = useTransform(progress, [0, 1], [0, -120]);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 1200);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-fade",
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: "power3.out" },
      );
      gsap.fromTo(
        ".floating-orb",
        { y: 0, x: 0 },
        { y: -24, x: 16, duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut", stagger: 0.3 },
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", darkMode);
    root.classList.toggle("light", !darkMode);
  }, [darkMode]);

  const activeThemeLabel = darkMode ? "Dark" : "Light";

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      {loading ? <LoadingScreen /> : null}
      <motion.div className="fixed left-0 top-0 z-50 h-1 origin-left bg-gradient-to-r from-violet-500 via-cyan-400 to-fuchsia-500" style={{ scaleX: progress }} />

      <motion.div
        className="pointer-events-none fixed inset-0 z-0 opacity-80"
        style={{ x: glowX, y: glowY }}
      >
        <div className="absolute left-0 top-24 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute right-0 top-32 h-80 w-80 rounded-full bg-cyan-400/15 blur-3xl" />
      </motion.div>

      <div className="pointer-events-none fixed inset-0 z-0 fancy-grid opacity-35" />

      <header className="sticky top-0 z-40 border-b border-white/8 bg-slate-950/55 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="#hero" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/6 shadow-[0_0_30px_rgba(124,58,237,0.25)]">
              <Sparkles className="h-5 w-5 text-cyan-300" />
            </div>
            <div>
              <p className="font-space-grotesk text-sm font-semibold tracking-[0.28em] text-white/80 uppercase">
                Harish Kathiravan
              </p>
              <p className="text-xs text-white/50">AI Engineer Portfolio</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 lg:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="rounded-full px-4 py-2 text-sm text-white/70 transition hover:bg-white/8 hover:text-white">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" onClick={() => setDarkMode((value) => !value)} aria-label="Toggle theme">
              {darkMode ? <SunMedium className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
              <span className="hidden sm:inline">{activeThemeLabel}</span>
            </Button>
            <Button variant="outline" size="sm" className="hidden sm:inline-flex lg:hidden" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle navigation menu">
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {menuOpen ? (
          <div className="border-t border-white/8 bg-slate-950/95 px-4 py-4 lg:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-2">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="rounded-2xl px-4 py-3 text-sm text-white/75 transition hover:bg-white/8 hover:text-white" onClick={() => setMenuOpen(false)}>
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        ) : null}
      </header>

      <main className="relative z-10 mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <section id="hero" ref={heroRef} className="relative grid min-h-[calc(100vh-88px)] items-center py-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:py-20">
          <div className="hero-fade relative z-10 max-w-3xl">
            <Badge className="mb-6 border-cyan-300/20 bg-cyan-400/10 text-cyan-100">
              <BadgeCheck className="mr-2 h-3.5 w-3.5" />
              Aspiring AI Engineer building real-world products
            </Badge>
            <h1 className="hero-fade font-space-grotesk text-5xl leading-[0.95] font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl">
              Harish Kathiravan
            </h1>
            <p className="hero-fade mt-5 max-w-2xl text-lg leading-8 text-white/72 sm:text-xl">
              AI Engineer | Machine Learning | Computer Vision | Full Stack Developer
            </p>
            <p className="hero-fade mt-6 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">
              Building intelligent software that combines Artificial Intelligence, Machine Learning, Computer Vision, NLP, Flutter, and Full Stack Engineering to solve real-world problems.
            </p>

            <div className="hero-fade mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild>
                <Link href="#projects">
                  View Projects <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="#resume">
                  <Download className="h-4 w-4" /> Download Resume
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={githubProfile} target="_blank" rel="noreferrer">
                  <Github className="h-4 w-4" /> GitHub
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={linkedinProfile} target="_blank" rel="noreferrer">
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </Link>
              </Button>
            </div>

            <div className="hero-fade mt-10 flex flex-wrap items-center gap-3 text-sm text-white/55">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
                <Rocket className="h-4 w-4 text-cyan-300" /> Production-first mindset
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
                <ShieldCheck className="h-4 w-4 text-violet-300" /> Accessibility conscious
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
                <ChartSpline className="h-4 w-4 text-emerald-300" /> Data-driven decisions
              </span>
            </div>
          </div>

          <div className="hero-fade relative mt-14 lg:mt-0">
            <Card className="relative overflow-hidden">
              <CardContent className="relative p-6 sm:p-8">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.16),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(124,58,237,0.22),transparent_34%)]" />
                <div className="relative space-y-6">
                  <div className="flex items-center justify-between text-sm text-white/55">
                    <span>AI Engineer</span>
                    <span>Harish Kathiravan</span>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-5 shadow-2xl">
                    <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/80">Current focus</p>
                    <p className="mt-3 text-2xl font-semibold text-white">Building intelligent products that feel premium, fast, and useful.</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <StatCard label="Models" value="10+" />
                    <StatCard label="Stacks" value="6" />
                    <StatCard label="Products" value="Real-world" />
                    <StatCard label="Goal" value="Impact" />
                  </div>
                  <div className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-white/45">Build mode</p>
                      <p className="mt-1 text-sm text-white/80">Modern, minimal, futuristic</p>
                    </div>
                    <div className="flex gap-2">
                      <span className="floating-orb h-3 w-3 rounded-full bg-violet-400 shadow-[0_0_20px_rgba(124,58,237,0.8)]" />
                      <span className="floating-orb h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.8)]" />
                      <span className="floating-orb h-3 w-3 rounded-full bg-emerald-300 shadow-[0_0_20px_rgba(110,231,183,0.8)]" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <SectionHeading id="about" eyebrow="About" title="A builder focused on production-ready AI experiences." />
        <motion.section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-120px" }} transition={{ duration: 0.6 }}>
          <Card>
            <CardContent>
              <p className="text-base leading-8 text-white/72 sm:text-lg">
                I am passionate about building intelligent applications that are not only technically strong but also polished, intuitive, and ready for real users. My work sits at the intersection of AI engineering, software craftsmanship, and product thinking.
              </p>
              <p className="mt-4 text-base leading-8 text-white/58 sm:text-lg">
                I enjoy combining AI with web and mobile development to create systems that feel fast, modern, and trustworthy. Whether I am working on computer vision, NLP, or full stack applications, I aim to ship production-ready experiences with clear architecture and clean UX.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["AI-first", "Designing systems around intelligence, not afterthoughts."],
                  ["Product-minded", "Focus on reliability, usability, and maintainability."],
                  ["Full stack", "End-to-end delivery from UI to data flow."],
                  ["Cross-platform", "Web and mobile experiences with Flutter and React."],
                ].map(([title, description]) => (
                  <div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm font-semibold text-white">{title}</p>
                    <p className="mt-2 text-sm leading-6 text-white/58">{description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        <SectionHeading id="skills" eyebrow="Skills" title="Technical depth across AI, systems, and product UI." />
        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {skillGroups.map((group, index) => (
            <motion.div key={group.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-120px" }} transition={{ duration: 0.45, delay: index * 0.04 }}>
              <Card className="h-full">
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/7 text-cyan-300">
                      <group.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-space-grotesk text-lg font-semibold text-white">{group.title}</h3>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <Badge key={item}>{item}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </section>

        <SectionHeading id="experience" eyebrow="Experience" title="Practical exposure building web experiences in a professional setting." />
        <section className="grid gap-5">
          {experience.map((item) => (
            <motion.div key={item.company} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-120px" }} transition={{ duration: 0.55 }}>
              <Card>
                <CardContent>
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/70">{item.period}</p>
                      <h3 className="mt-2 font-space-grotesk text-2xl font-semibold text-white">{item.role}</h3>
                      <p className="mt-1 text-white/60">{item.company}</p>
                    </div>
                    <Badge className="w-fit border-emerald-300/20 bg-emerald-400/10 text-emerald-100">Web Development Intern</Badge>
                  </div>
                  <div className="mt-5 grid gap-3">
                    {item.points.map((point) => (
                      <p key={point} className="rounded-2xl border border-white/8 bg-white/4 p-4 text-sm leading-7 text-white/70">
                        {point}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </section>

        <SectionHeading id="projects" eyebrow="Featured Projects" title="Selected work blending AI engineering with modern product design." />
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div key={project.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-120px" }} transition={{ duration: 0.55, delay: index * 0.05 }}>
              <Card className="group h-full overflow-hidden transition duration-500 hover:-translate-y-1 hover:border-cyan-300/30 hover:shadow-[0_24px_90px_rgba(34,211,238,0.12)]">
                <CardContent className="flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/70">{project.metric}</p>
                      <h3 className="mt-2 font-space-grotesk text-2xl font-semibold text-white">{project.name}</h3>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/6 p-3 text-cyan-300 transition group-hover:scale-110">
                      <Cpu className="h-5 w-5" />
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-white/66">{project.description}</p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-wrap gap-3 pt-6">
                    <Button variant="secondary" size="sm" asChild>
                      <Link href={project.github} target="_blank" rel="noreferrer">
                        <Github className="h-4 w-4" /> GitHub
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={project.demo}>
                        <Globe className="h-4 w-4" /> Live Demo
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </section>

        <SectionHeading id="stats" eyebrow="GitHub Stats" title="Numbers that reflect an engineering-first learning curve." />
        <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-120px" }} transition={{ duration: 0.45, delay: index * 0.04 }}>
              <Card>
                <CardContent>
                  <p className="text-sm text-white/55">{stat.label}</p>
                  <p className="mt-3 font-space-grotesk text-4xl font-semibold text-white">
                    <CountUp value={stat.value} />
                    {stat.suffix}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </section>

        <SectionHeading id="resume" eyebrow="Resume" title="Download a concise overview of experience, projects, and technical strengths." />
        <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <Card>
            <CardContent className="space-y-5">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-cyan-200/70">Resume</p>
                <h3 className="mt-2 font-space-grotesk text-2xl font-semibold text-white">Harish Kathiravan</h3>
              </div>
              <p className="text-white/65 leading-7">
                A focused summary of my work in AI engineering, computer vision, machine learning, full stack development, and Flutter-based mobile products.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="#contact">
                    <Mail className="h-4 w-4" /> Request Resume
                  </Link>
                </Button>
                <Button variant="secondary" asChild>
                  <a href={resumePath} download>
                    <Download className="h-4 w-4" /> Download PDF
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <div className="space-y-4">
                {[
                  "AI and ML systems with explainability and practical deployment thinking.",
                  "Full stack apps using modern React, Node.js, and data-driven architecture.",
                  "Computer vision prototypes and intelligent mobile experiences with Flutter.",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/4 p-4 text-sm leading-7 text-white/72">
                    <BadgeCheck className="mt-1 h-4 w-4 shrink-0 text-emerald-300" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        <SectionHeading id="contact" eyebrow="Contact" title="Open to AI engineering, product, and full stack opportunities." />
        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card>
            <CardContent className="space-y-5">
              <p className="text-sm text-white/55">Let’s build something intelligent.</p>
              <div className="space-y-3 text-sm text-white/72">
                <a href="mailto:harish@example.com" className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/4 px-4 py-3 transition hover:bg-white/7">
                  <Mail className="h-4 w-4 text-cyan-300" /> harish@example.com
                </a>
                <a href={githubProfile} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/4 px-4 py-3 transition hover:bg-white/7">
                  <Github className="h-4 w-4 text-violet-300" /> github.com/harishkathiravan-sys
                </a>
                <a href={linkedinProfile} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/4 px-4 py-3 transition hover:bg-white/7">
                  <Linkedin className="h-4 w-4 text-cyan-300" /> linkedin.com/in/harish-kathiravan-05b229304
                </a>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <form className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <InputField label="Name" placeholder="Your name" />
                  <InputField label="Email" placeholder="you@company.com" type="email" />
                </div>
                <InputField label="Subject" placeholder="Project, role, or collaboration" />
                <div>
                  <label className="mb-2 block text-sm text-white/60">Message</label>
                  <textarea rows={6} className="w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 outline-none transition placeholder:text-white/30 focus:border-cyan-300/40 focus:bg-white/7" placeholder="Tell me what you’re building..." />
                </div>
                <Button type="button" className="w-fit">
                  Send Message <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/8 bg-slate-950/50">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} Harish Kathiravan. Crafted with Next.js, React, TypeScript, Tailwind CSS, Framer Motion, GSAP, and Shadcn UI patterns.</p>
          <div className="flex items-center gap-4">
            <a href="#hero" className="transition hover:text-white">Back to top</a>
            <a href={githubProfile} target="_blank" rel="noreferrer" className="transition hover:text-white">GitHub</a>
            <a href={linkedinProfile} target="_blank" rel="noreferrer" className="transition hover:text-white">LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="h-16 w-16 animate-pulse rounded-2xl border border-white/10 bg-white/6 shadow-[0_0_80px_rgba(34,211,238,0.18)]" />
        <p className="text-sm uppercase tracking-[0.3em] text-white/45">Loading portfolio</p>
      </div>
    </div>
  );
}

function SectionHeading({ id, eyebrow, title }: { id: string; eyebrow: string; title: string }) {
  return (
    <div id={id} className="scroll-mt-28 pb-6 pt-20 sm:pt-24">
      <p className="text-xs uppercase tracking-[0.35em] text-cyan-200/65">{eyebrow}</p>
      <h2 className="mt-3 max-w-3xl font-space-grotesk text-3xl leading-tight font-semibold text-white sm:text-4xl lg:text-5xl">
        <span className="text-gradient">{title}</span>
      </h2>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs uppercase tracking-[0.22em] text-white/45">{label}</p>
      <p className="mt-2 text-lg font-semibold text-white">{value}</p>
    </div>
  );
}

function CountUp({ value }: { value: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const start = performance.now();
    const duration = 900;

    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * value));
      if (progress < 1 && !controller.signal.aborted) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
    return () => controller.abort();
  }, [value]);

  return <span>{count}</span>;
}

function InputField({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-white/60">{label}</span>
      <input
        {...props}
        className={cn(
          "w-full rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/85 outline-none transition placeholder:text-white/30 focus:border-cyan-300/40 focus:bg-white/7",
          props.className,
        )}
      />
    </label>
  );
}
