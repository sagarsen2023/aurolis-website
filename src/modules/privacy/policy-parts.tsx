import type { AnchorHTMLAttributes, ReactNode } from "react";

export function Section({
  id,
  title,
  children,
}: Readonly<{ id: string; title: string; children: ReactNode }>) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-28 border-t border-line pt-10 pb-2 first:border-t-0 first:pt-0"
    >
      <h2
        id={`${id}-title`}
        className="text-[clamp(22px,2.4vw,28px)] leading-tight font-medium tracking-[-0.02em]"
      >
        {title}
      </h2>
      <div className="mt-5 space-y-4 text-[16.5px] leading-[1.7] text-white/72">
        {children}
      </div>
    </section>
  );
}

export function Points({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <ul className="space-y-3 pl-5 marker:text-vio [&>li]:list-disc [&>li]:pl-1">
      {children}
    </ul>
  );
}

export function Strong({ children }: Readonly<{ children: ReactNode }>) {
  return <strong className="font-medium text-white">{children}</strong>;
}

export function TextLink({
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className="text-white underline decoration-white/30 underline-offset-4 transition-colors hover:text-lav hover:decoration-lav focus-visible:outline-2 focus-visible:outline-lav"
      {...props}
    >
      {children}
    </a>
  );
}
