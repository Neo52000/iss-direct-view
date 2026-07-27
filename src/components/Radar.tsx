import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/** Pulsing radar-ring indicator, used for "live"/"real-time" badges. */
export function Radar({
  color = "var(--iss-ok)",
  className,
}: {
  color?: string;
  className?: string;
}) {
  return (
    <span className={cn("relative flex h-2 w-2 shrink-0", className)} aria-hidden>
      {[0, 0.6].map((delay) => (
        <motion.span
          key={delay}
          className="absolute inline-flex h-full w-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: [1, 2.4], opacity: [0.6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut", delay }}
        />
      ))}
      <span
        className="relative inline-flex h-2 w-2 rounded-full"
        style={{ backgroundColor: color }}
      />
    </span>
  );
}
