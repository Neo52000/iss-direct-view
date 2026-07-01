import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Clapperboard, Copy, Check, Circle, CheckCircle2 } from "lucide-react";
import { shortsSchedule, type ShortIdea } from "@/lib/shortsStudio";
import { getReadableDay } from "@/lib/iss-utils";

export const Route = createFileRoute("/_authenticated/admin/shorts")({
  head: () => ({
    meta: [
      { title: "Back office — Studio Shorts" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminShortsPage,
});

const POSTED_KEY = "iss-shorts-posted";

function loadPosted(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    return new Set(JSON.parse(localStorage.getItem(POSTED_KEY) ?? "[]"));
  } catch {
    return new Set();
  }
}

function shortKey(s: ShortIdea) {
  return `${s.date}#${s.slot}`;
}

function AdminShortsPage() {
  const schedule = useMemo(() => shortsSchedule(new Date(), 14), []);
  const [posted, setPosted] = useState<Set<string>>(() => loadPosted());

  const togglePosted = (s: ShortIdea) => {
    setPosted((prev) => {
      const next = new Set(prev);
      const k = shortKey(s);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      localStorage.setItem(POSTED_KEY, JSON.stringify([...next]));
      return next;
    });
  };

  const todayPosted = schedule[0]?.filter((s) => posted.has(shortKey(s))).length ?? 0;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 md:px-6">
      <div className="flex items-center gap-3">
        <Clapperboard className="h-6 w-6 text-[color:var(--iss-cyan)]" />
        <h1 className="font-display text-2xl font-extrabold">Studio Shorts</h1>
      </div>
      <p className="mt-2 max-w-2xl text-white/70">
        2 idées de shorts/Reels par jour, générées automatiquement à partir de la banque d'anecdotes
        espace : accroche, script prêt à filmer (vue Terre + anecdote + appel à l'action), légende
        et hashtags. Copiez, filmez avec le live, publiez, puis cochez.
      </p>
      <p className="mt-2 text-sm text-white/50">Aujourd'hui : {todayPosted}/2 publiés.</p>

      <div className="mt-8 space-y-8">
        {schedule.map((day, i) => (
          <div key={day[0].date}>
            <h2 className="font-display text-lg font-bold text-white/80">
              {i === 0 ? "Aujourd'hui — " : ""}
              {getReadableDay(day[0].date)}
            </h2>
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              {day.map((s) => (
                <ShortCard
                  key={shortKey(s)}
                  short={s}
                  posted={posted.has(shortKey(s))}
                  onToggle={() => togglePosted(s)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ShortCard({
  short,
  posted,
  onToggle,
}: {
  short: ShortIdea;
  posted: boolean;
  onToggle: () => void;
}) {
  const [copied, setCopied] = useState<"script" | "caption" | null>(null);

  const copy = async (what: "script" | "caption") => {
    const text = what === "script" ? short.script : `${short.caption}\n\n${short.hashtags}`;
    await navigator.clipboard.writeText(text);
    setCopied(what);
    setTimeout(() => setCopied(null), 1800);
  };

  return (
    <div className={`iss-card flex flex-col p-5 ${posted ? "opacity-60" : ""}`}>
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[color:var(--iss-cyan)]">
          Short #{short.slot}
        </span>
        <button
          onClick={onToggle}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/70 hover:text-white"
        >
          {posted ? (
            <CheckCircle2 className="h-4 w-4 text-[color:var(--iss-ok)]" />
          ) : (
            <Circle className="h-4 w-4" />
          )}
          {posted ? "Publié" : "À publier"}
        </button>
      </div>
      <h3 className="mt-2 font-display text-base font-bold leading-snug">{short.hook}</h3>
      <p className="mt-1 text-xs text-white/50">🎥 {short.earthView}</p>
      <pre className="mt-3 whitespace-pre-wrap rounded-lg bg-white/[0.03] p-3 text-xs text-white/75">
        {short.script}
      </pre>
      <p className="mt-3 text-xs text-white/60">{short.hashtags}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => copy("script")}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3 py-2 text-xs font-semibold hover:bg-white/10"
        >
          {copied === "script" ? (
            <Check className="h-3.5 w-3.5 text-[color:var(--iss-ok)]" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
          Copier le script
        </button>
        <button
          onClick={() => copy("caption")}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3 py-2 text-xs font-semibold hover:bg-white/10"
        >
          {copied === "caption" ? (
            <Check className="h-3.5 w-3.5 text-[color:var(--iss-ok)]" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
          Copier légende + hashtags
        </button>
      </div>
    </div>
  );
}
