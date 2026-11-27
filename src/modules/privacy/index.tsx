import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { AurolisMark } from "@/components/aurolis-mark";
import { Wordmark } from "@/components/wordmark";
import { PRIVACY_SECTIONS, PRIVACY_UPDATED } from "@/constants/privacy";
import { SiteFooter } from "@/modules/home/footer/site-footer";
import { PolicyContent } from "./policy-content";

const PAGE_TITLE = "Privacy policy · Aurolis";

function PrivacyModule() {
  useEffect(() => {
    const previous = document.title;
    document.title = PAGE_TITLE;
    window.scrollTo(0, 0);
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:top-4">
        <div className="flex items-center gap-0.5 rounded-2xl border border-white/[0.09] bg-[rgba(30,27,34,0.55)] p-1 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur-xl">
          <Link
            to="/"
            aria-label="Aurolis home"
            className="flex h-10 items-center gap-2 rounded-xl pr-3 pl-1.5 text-white transition-colors hover:bg-white/[0.06] focus-visible:outline-2 focus-visible:outline-lav"
          >
            <AurolisMark className="size-7" />
            <Wordmark className="h-[15px] w-auto" title="" />
          </Link>
          <span aria-hidden className="mx-1 h-5 w-px bg-white/10" />
          <Link
            to="/"
            className="flex min-h-10 items-center gap-2 rounded-xl px-3 text-[14px] whitespace-nowrap text-white/75 transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline-2 focus-visible:outline-lav"
          >
            <ArrowLeft className="size-4" aria-hidden />
            Back to home
          </Link>
        </div>
      </header>

      <main className="relative px-[max(4vw,16px)] pt-[clamp(120px,14vw,180px)] pb-[clamp(64px,8vw,120px)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(ellipse_60%_70%_at_50%_0%,rgba(123,92,224,0.32),rgba(80,50,220,0.08)_55%,transparent_80%)]" />
        <div className="relative mx-auto max-w-[1100px]">
          <p className="font-mono text-[13px] tracking-[0.08em] text-vio uppercase">
            Legal
          </p>
          <h1 className="mt-4 text-[clamp(44px,7vw,88px)] leading-[0.95] font-medium tracking-[-0.04em]">
            Privacy{" "}
            <span className="font-serif font-normal tracking-[-0.02em] text-lav italic">
              policy
            </span>
          </h1>
          <p className="mt-6 max-w-[38rem] text-[18px] leading-relaxed text-white/65">
            Aurolis keeps your work on your computer. Here is exactly what the
            website and the app do with data, and what they don&apos;t.
          </p>
          <p className="mt-6 text-[14px] text-white/45">
            Last updated{" "}
            <time dateTime="2026-11-27" className="text-white/70">
              {PRIVACY_UPDATED}
            </time>
          </p>

          <div className="mt-[clamp(48px,6vw,80px)] grid gap-12 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
            <nav aria-label="On this page" className="hidden lg:block">
              <div className="sticky top-28">
                <p className="text-[13px] font-medium tracking-[0.08em] text-white/45 uppercase">
                  On this page
                </p>
                <ol className="mt-3 border-l border-line">
                  {PRIVACY_SECTIONS.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="-ml-px flex min-h-9 items-center border-l border-transparent pl-4 text-[14.5px] text-white/60 transition-colors hover:border-lav hover:text-white focus-visible:outline-2 focus-visible:outline-lav"
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </nav>
            <article className="max-w-[46rem] rounded-3xl border border-line bg-panel/60 p-[clamp(24px,4vw,48px)]">
              <PolicyContent />
            </article>
          </div>
        </div>
      </main>

      <SiteFooter anchorBase="/" />
    </>
  );
}

export default PrivacyModule;
