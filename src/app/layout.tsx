import type { Metadata } from "next";
import { JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Francesco Sardo — Software Engineer",
  description:
    "MSc CS (AI), UniTO, 98/110. Full-stack developer and AI tooling engineer. Co-founder of BloomTicket. Open to relocation: NL · CH · DE · SE · DK · IE.",
  keywords: ["Francesco Sardo", "software engineer", "full stack", "React", "TypeScript", "AI engineering", "junior developer"],
  openGraph: {
    title: "Francesco Sardo — Software Engineer",
    description: "MSc CS (AI) · Full-stack · AI tooling · BloomTicket co-founder · Open to relocation",
    type: "website",
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
      className={`${jetbrainsMono.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-black text-zinc-100">{children}</body>
    </html>
  );
}
