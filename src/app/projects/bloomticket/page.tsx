import { CaseStudyLayout } from "@/components/projects/CaseStudyLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BloomTicket — Francesco Sardo",
  description: "Case study: BloomTicket live iOS/Android event ticketing app",
};

const METRICS = [
  { value: "2", label: "Stores (iOS + Android)" },
  { value: "Live", label: "Production Status" },
  { value: "1", label: "Developer (me)" },
  { value: "∞", label: "Events Supported" },
];

const IMAGES = [
  {
    src: "/img/iPhone 14-15 Pro Max 6.7 - Home.png",
    alt: "BloomTicket — Home screen on iPhone 14/15 Pro Max",
    caption: "BloomTicket home screen — iOS",
  },
];

export default function BloomTicketPage() {
  return (
    <CaseStudyLayout
      title="BloomTicket"
      statusLabel="● LIVE — App Store + Google Play"
      statusColor="text-green-400 border-green-400/30"
      tagline="Event ticketing ecosystem for iOS and Android. Co-founded and led all mobile development independently — from architecture to App Store submission."
      techStack={["React Native", "TypeScript", "Redux Toolkit", "Firebase", "Stripe", "NativeWind", "React Navigation"]}
      metrics={METRICS}
      images={IMAGES}
    >
      <section>
        <h2 className="font-mono text-base text-zinc-200 mb-3">// Problem</h2>
        <p>
          Event organizers needed a mobile-first ticketing solution that handled the full lifecycle: event creation,
          ticket sales, payment processing, and door check-in via QR code — all without technical expertise on their end.
        </p>
      </section>

      <section>
        <h2 className="font-mono text-base text-zinc-200 mb-3">// My Role</h2>
        <p>
          Co-founder and sole mobile developer. Designed the architecture, built the consumer-facing app from scratch,
          set up the multi-environment infrastructure (dev / staging / production), and shipped both platforms independently.
        </p>
      </section>

      <section>
        <h2 className="font-mono text-base text-zinc-200 mb-3">// Architecture</h2>
        <div className="border border-zinc-800 bg-zinc-900/40 p-4 font-mono text-xs">
          <div className="flex flex-wrap gap-2 items-center text-zinc-500">
            <span className="text-amber-400">React Native App</span>
            <span>→</span>
            <span className="text-blue-400">Redux Toolkit</span>
            <span>→</span>
            <span className="text-green-400">Firebase Auth + Push</span>
            <span>→</span>
            <span className="text-purple-400">Laravel REST API</span>
            <span>→</span>
            <span className="text-orange-400">Stripe Payments</span>
          </div>
        </div>
      </section>

      <section>
        <h2 className="font-mono text-base text-zinc-200 mb-3">// Key Engineering Decisions</h2>
        <div className="flex flex-col gap-3">
          {[
            ["Multi-environment setup", "Separate dev/staging/production configs with environment-specific Firebase projects and API endpoints — critical for safe releases."],
            ["State management with Redux Toolkit", "RTK Query for server state, Redux slices for UI state. Eliminated prop drilling across the deep navigation tree."],
            ["Stripe integration", "Native Stripe SDK with server-side payment intent creation. Client never touches raw card data — PCI-compliant by design."],
            ["QR check-in system", "Camera-based QR scanner with real-time validation against the backend. Handles offline fallback for poor-signal venues."],
            ["Apple/Google social login", "Implemented Sign in with Apple (required for iOS App Store) and Google Sign-In via Firebase Auth — custom token flow."],
          ].map(([title, desc]) => (
            <div key={title as string} className="flex gap-3">
              <span className="text-amber-400/50 shrink-0 mt-0.5">▪</span>
              <div>
                <span className="text-zinc-300">{title}: </span>
                <span className="text-zinc-500">{desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-wrap gap-3 pt-4 border-t border-zinc-900">
        <a
          href="https://apps.apple.com/it/app/bloomticket/id6744039750"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs border border-zinc-700 text-zinc-400 px-4 py-2 hover:border-zinc-500 hover:text-zinc-200 transition-colors"
        >
          App Store ↗
        </a>
        <a
          href="https://bloomticket.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs border border-zinc-700 text-zinc-400 px-4 py-2 hover:border-zinc-500 hover:text-zinc-200 transition-colors"
        >
          bloomticket.com ↗
        </a>
      </section>
    </CaseStudyLayout>
  );
}
