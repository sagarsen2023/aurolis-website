import { ArrowUpRight, Star } from "lucide-react";
import { LinkButton } from "@/components/link-button";
import { FOOTER_LINKS, SITE_LINKS } from "@/constants/site";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden px-[max(4vw,16px)] pt-[clamp(80px,10vw,140px)]">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-[radial-gradient(ellipse_70%_60%_at_50%_100%,rgba(106,70,255,0.6),rgba(80,50,220,0.18)_50%,transparent_75%)]" />
      <div className="pointer-events-none absolute right-[-10%] bottom-[-20%] h-[60%] w-[50%] rounded-full bg-[radial-gradient(closest-side,rgba(60,60,255,0.35),transparent)]" />
      <div className="relative mx-auto max-w-[1220px]">
        <div className="grid items-end gap-10 md:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <p className="text-[14px] text-white/60">
              Questions, ideas or bugs
            </p>
            <a
              href={SITE_LINKS.issues}
              className="group mt-2 inline-flex items-center gap-3 text-[clamp(30px,4.4vw,56px)] leading-[1.05] tracking-[-0.03em] transition-colors hover:text-lav focus-visible:outline-2 focus-visible:outline-lav"
            >
              Open an issue on GitHub
              <ArrowUpRight
                className="size-[0.7em] shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                aria-hidden
              />
            </a>
          </div>
          <div className="max-w-[20rem]">
            <p className="text-[18px] font-medium">Follow the project</p>
            <p className="mt-1 text-[15px] text-white/60">
              Star the repository to hear about new releases.
            </p>
            <LinkButton
              href={SITE_LINKS.repository}
              className="mt-4"
              icon={<Star className="size-4" aria-hidden />}
            >
              Star on GitHub
            </LinkButton>
          </div>
        </div>
        <nav
          aria-label="Footer"
          className="mt-16 grid grid-cols-2 gap-x-8 gap-y-1 border-b border-white/15 pb-8 sm:flex sm:flex-wrap sm:justify-between"
        >
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="flex min-h-11 items-center text-[18px] text-white/85 transition-colors hover:text-lav"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <p
          aria-hidden
          className="mt-[clamp(28px,4vw,56px)] text-center text-[clamp(60px,16.3vw,252px)] leading-[0.82] font-medium tracking-[-0.03em] whitespace-nowrap uppercase"
        >
          Aurolis
        </p>
        <div className="flex flex-col gap-3 py-8 text-[13px] text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Broadifi Tech Pvt Ltd. Aurolis is open source.</p>
          <div className="flex gap-6">
            <a href={SITE_LINKS.repository} className="hover:text-white">
              Source code
            </a>
            <a href={SITE_LINKS.issues} className="hover:text-white">
              Report an issue
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
