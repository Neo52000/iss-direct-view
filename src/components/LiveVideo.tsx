import { Radar } from "./Radar";

const DEFAULT_ID = "awQzjn72bI0";

export function LiveVideo({ id }: { id?: string }) {
  const videoId = id || import.meta.env.VITE_YOUTUBE_LIVE_ID || DEFAULT_ID;
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl shadow-[color:var(--iss-blue)]/20">
      <div className="relative" style={{ paddingTop: "56.25%" }}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&playsinline=1&rel=0`}
          title="Live ISS — vue depuis la Station Spatiale Internationale"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="absolute inset-0 h-full w-full"
        />
      </div>
      <div className="pointer-events-none absolute left-3 top-3 flex items-center gap-2 rounded-full bg-black/70 px-3 py-1.5 text-xs font-bold uppercase tracking-wider">
        <Radar color="var(--iss-live)" />
        En direct
      </div>
      <div className="border-t border-white/10 bg-black/40 px-4 py-2 text-xs text-white/60">
        Source : NASA TV / International Space Station Live
      </div>
    </div>
  );
}