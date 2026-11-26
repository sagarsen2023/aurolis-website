import { useId } from "react";
import {
  Activity,
  FileJson,
  FolderGit2,
  GitBranch,
  Globe,
  Orbit,
} from "lucide-react";
import { IconBadge } from "@/components/icon-badge";

export function ProtocolIllustration() {
  return (
    <div aria-hidden className="relative h-[190px] w-[250px]">
      <div className="absolute top-[22px] left-[44px] h-[150px] w-[164px] overflow-hidden rounded-[24px] border border-white/[0.08] bg-[linear-gradient(160deg,#2a2630,#1a181c)] shadow-[0_30px_60px_-24px_rgba(0,0,0,0.9)]">
        <svg viewBox="0 0 164 150" fill="none" className="absolute inset-0">
          {[0, 1, 2].map((ring) => (
            <ellipse
              key={ring}
              cx="82"
              cy={70 - ring * 4}
              rx={30 + ring * 16}
              ry={16 + ring * 10}
              stroke="rgba(255,255,255,0.34)"
              strokeWidth="1"
            />
          ))}
        </svg>
        <IconBadge
          size="sm"
          icon={Orbit}
          tone="lav"
          className="absolute top-[56px] left-1/2 -translate-x-1/2"
        />
        <p className="absolute inset-x-0 bottom-3 text-center text-[13px] text-white/80">
          REST · GraphQL · WS
        </p>
      </div>
      <IconBadge
        size="md"
        icon={Activity}
        tone="coral"
        className="absolute top-0 left-[24px]"
      />
      <div className="absolute top-[88px] right-0 rounded-xl bg-white px-3 py-1.5 text-lav-ink shadow-[0_14px_30px_-10px_rgba(0,0,0,0.8)]">
        <p className="text-[13px] leading-tight font-semibold">201 Created</p>
        <p className="text-[13px] leading-tight text-black/55">139 ms</p>
      </div>
    </div>
  );
}

export function RepositoryIllustration() {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <div aria-hidden className="relative h-[200px] w-[260px]">
      <svg viewBox="0 0 260 200" fill="none" className="absolute inset-0">
        <defs>
          <linearGradient id={`${id}edge`} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#e73825" />
            <stop offset="0.5" stopColor="#a048ff" />
            <stop offset="1" stopColor="#6a46ff" />
          </linearGradient>
        </defs>
        {[0, 1, 2].map((ring) => (
          <rect
            key={ring}
            x={32 - ring * 12}
            y={62 - ring * 12}
            width={196 + ring * 24}
            height={76 + ring * 24}
            rx={38 + ring * 12}
            stroke={`url(#${id}edge)`}
            strokeOpacity={0.9 - ring * 0.25}
            strokeWidth="1.2"
          />
        ))}
      </svg>
      <div className="absolute top-[78px] left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-[#2a272e] px-5 py-3 text-[15px] whitespace-nowrap text-white shadow-[0_16px_40px_-12px_rgba(0,0,0,0.9)]">
        Commit &amp; sync
      </div>
      <IconBadge
        size="md"
        icon={GitBranch}
        tone="lav"
        className="absolute top-[22px] right-[30px]"
      />
      <IconBadge
        size="sm"
        icon={FileJson}
        tone="dark"
        className="absolute top-[30px] left-[34px]"
      />
      <IconBadge
        size="lg"
        icon={FolderGit2}
        tone="dark"
        className="absolute bottom-[14px] left-1/2 -translate-x-1/2"
      />
    </div>
  );
}

const SCOPES = [
  { label: "Environment", value: "Production", active: true },
  { label: "Collection", value: "Payments", active: false },
  { label: "Globals", value: "Workspace", active: false },
];

export function VariablesIllustration() {
  return (
    <div aria-hidden className="relative h-[184px] w-[220px]">
      <div className="absolute top-[18px] right-0 w-[196px] rounded-[20px] border border-white/[0.08] bg-[linear-gradient(160deg,#27232b,#19171c)] p-3.5 shadow-[0_30px_60px_-24px_rgba(0,0,0,0.9)]">
        <p className="pl-1 font-mono text-[13px] text-lav">{"{{baseUrl}}"}</p>
        <ul className="relative mt-2.5 space-y-1.5">
          <span className="absolute top-3 bottom-3 left-[13px] w-px bg-white/15" />
          {SCOPES.map((scope) => (
            <li
              key={scope.label}
              className={`relative flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-[13px] ${scope.active ? "bg-white/[0.07] text-white" : "text-white/50"}`}
            >
              <span
                className={`size-2 rounded-full ${scope.active ? "bg-lav shadow-[0_0_10px_#edc5fc]" : "bg-white/30"}`}
              />
              {scope.label}
            </li>
          ))}
        </ul>
      </div>
      <IconBadge
        size="md"
        icon={Globe}
        tone="lav"
        className="absolute top-0 left-0"
      />
    </div>
  );
}

export function TypesIllustration() {
  return (
    <div aria-hidden className="relative h-[184px] w-[220px]">
      <div className="absolute top-[22px] left-0 w-[200px] rounded-[20px] border border-white/[0.08] bg-[linear-gradient(160deg,#27232b,#19171c)] px-4 py-3.5 font-mono text-[13px] leading-[1.7] shadow-[0_30px_60px_-24px_rgba(0,0,0,0.9)]">
        <p>
          <span className="text-lav">interface</span>{" "}
          <span className="text-white">Payment</span> {"{"}
        </p>
        <p className="pl-4 text-white/70">
          id: <span className="text-vio">string</span>;
        </p>
        <p className="pl-4 text-white/70">
          amount: <span className="text-vio">number</span>;
        </p>
        <p className="pl-4 text-white/70">
          captured: <span className="text-vio">boolean</span>;
        </p>
        <p>{"}"}</p>
      </div>
      <span className="absolute top-0 right-0 grid size-10 place-items-center rounded-xl bg-lav font-mono text-[13px] font-semibold text-lav-ink shadow-[0_0_30px_-4px_rgba(237,197,252,0.6)]">
        TS
      </span>
    </div>
  );
}
