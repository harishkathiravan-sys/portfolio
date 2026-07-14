import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { getSiteUrl } from "@/lib/site";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: "Harish Kathiravan | AI Engineer Portfolio",
    template: "%s | Harish Kathiravan",
  },
  description:
    "Premium personal portfolio for Harish Kathiravan, an AI Engineer building production-ready intelligent products across AI, ML, computer vision, NLP, web, and mobile.",
  keywords: [
    "Harish Kathiravan",
    "AI Engineer",
    "Machine Learning",
    "Computer Vision",
    "Full Stack Developer",
    "Flutter",
    "Portfolio",
  ],
  openGraph: {
    title: "Harish Kathiravan | AI Engineer Portfolio",
    description:
      "Modern portfolio showcasing AI engineering, machine learning, computer vision, and full stack projects.",
    url: "https://harishkathiravan.com",
    siteName: "Harish Kathiravan",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harish Kathiravan | AI Engineer Portfolio",
    description:
      "Modern portfolio showcasing AI engineering, machine learning, computer vision, and full stack projects.",
  },
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/icon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${spaceGrotesk.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
