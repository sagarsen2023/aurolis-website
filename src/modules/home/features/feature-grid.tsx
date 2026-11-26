import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import {
  ProtocolIllustration,
  RepositoryIllustration,
  TypesIllustration,
  VariablesIllustration,
} from "./illustrations";

type FeatureTextProps = {
  title: string;
  body: string;
  className?: string;
};

function FeatureText({ title, body, className }: FeatureTextProps) {
  return (
    <div className={className}>
      <h3 className="text-[clamp(21px,1.9vw,25px)] leading-[1.15] font-medium tracking-[-0.015em] text-balance">
        {title}
      </h3>
      <p className="mt-2.5 text-[16px] leading-relaxed text-white/65">{body}</p>
    </div>
  );
}

type SideBySideProps = {
  illustration: ReactNode;
  title: string;
  body: string;
};

function SideBySide({ illustration, title, body }: SideBySideProps) {
  return (
    <div className="flex flex-col items-center gap-6 py-10 sm:flex-row sm:items-center sm:gap-8 lg:py-12">
      <div className="shrink-0">{illustration}</div>
      <FeatureText
        title={title}
        body={body}
        className="text-center sm:text-left"
      />
    </div>
  );
}

const COLUMN = "flex flex-col items-center px-6 py-14 text-center lg:px-8";

export function FeatureGrid() {
  return (
    <section
      aria-labelledby="grid-title"
      className="relative px-[max(4vw,16px)] pt-[clamp(40px,8vw,120px)] pb-[clamp(80px,12vw,180px)]"
    >
      <div className="pointer-events-none absolute top-1/2 left-1/2 h-[80%] w-[92vw] -translate-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.045),transparent)]" />
      <h2 id="grid-title" className="sr-only">
        What you get in Aurolis
      </h2>
      <div className="relative mx-auto grid max-w-[1220px] grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1.55fr]">
        <div
          className={cn(
            COLUMN,
            "border-b border-white/10 md:border-r md:border-b-0 lg:justify-center",
          )}
        >
          <ProtocolIllustration />
          <FeatureText
            className="mt-10 max-w-[19rem]"
            title="Every protocol in one client"
            body="REST with cancel and timeouts, GraphQL with schema introspection, WebSocket and Socket.IO with live events."
          />
        </div>
        <div
          className={cn(
            COLUMN,
            "border-b border-white/10 md:border-b-0 lg:border-r",
          )}
        >
          <FeatureText
            className="max-w-[19rem]"
            title="Workspaces are git repositories"
            body="Each collection is a folder of readable files. Clone it, branch it and review it like the rest of your code."
          />
          <div className="mt-10">
            <RepositoryIllustration />
          </div>
        </div>
        <div className="flex flex-col justify-center px-6 md:col-span-2 md:border-t md:border-white/10 lg:col-span-1 lg:border-t-0 lg:px-10">
          <SideBySide
            illustration={<VariablesIllustration />}
            title="Variables that resolve in order"
            body="Environment first, then collection, then globals, with completion as you type a name in double braces."
          />
          <div className="h-px bg-white/10" />
          <SideBySide
            illustration={<TypesIllustration />}
            title="Types from any response"
            body="Turn a JSON response or request body into TypeScript interfaces, ready to paste into your app."
          />
        </div>
      </div>
    </section>
  );
}
