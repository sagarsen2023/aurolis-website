import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { useSmoothScroll } from "@/hooks/use-smooth-scroll";
import { NavPill } from "@/modules/layout/nav-pill";
import { KineticStatement } from "./about/kinetic-statement";
import { LogoOrbit } from "./about/logo-orbit";
import { FeatureGrid } from "./features/feature-grid";
import { FloatingCards } from "./features/floating-cards";
import { FooterCta } from "./footer/footer-cta";
import { SiteFooter } from "./footer/site-footer";
import { WaveWordmark } from "./footer/wave-wordmark";
import { Hero } from "./hero/hero";
import { Splash } from "./splash/splash";

type Phase = "splash" | "leaving" | "done";

function HomeModule() {
  const reduce = useReducedMotion() ?? false;
  const [phase, setPhase] = useState<Phase>(reduce ? "done" : "splash");
  const revealed = phase !== "splash";
  useSmoothScroll(!reduce, !revealed);

  useEffect(() => {
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <NavPill visible={revealed} />
      <main>
        <Hero revealed={revealed} />
        <LogoOrbit />
        <KineticStatement />
        <FloatingCards />
        <FeatureGrid />
        <WaveWordmark />
        <FooterCta />
      </main>
      <SiteFooter />
      {phase !== "done" && (
        <Splash
          onLeave={() => setPhase("leaving")}
          onDone={() => setPhase("done")}
        />
      )}
    </>
  );
}

export default HomeModule;
