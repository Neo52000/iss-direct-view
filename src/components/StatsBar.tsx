import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "motion/react";
import { fadeUp, staggerContainer } from "@/lib/motion";

const STATS = [
  { value: 400, suffix: " km", label: "Altitude orbitale" },
  { value: 27600, suffix: " km/h", label: "Vitesse de croisière" },
  { value: 16, suffix: "", label: "Orbites terrestres / jour" },
  { value: 90, suffix: " min", label: "Durée d'une orbite" },
] as const;

function CountUpStat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <motion.div variants={fadeUp} className="flex flex-col items-center gap-1 text-center">
      <span ref={ref} className="font-display text-3xl font-extrabold text-white md:text-4xl">
        {display.toLocaleString("fr-FR")}
        {suffix}
      </span>
      <span className="text-xs text-white/60 md:text-sm">{label}</span>
    </motion.div>
  );
}

export function StatsBar() {
  return (
    <motion.section
      className="mx-auto max-w-7xl px-4 pb-4 md:px-6"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainer}
    >
      <div className="iss-card grid grid-cols-2 gap-6 p-6 md:grid-cols-4 md:p-8">
        {STATS.map((s) => (
          <CountUpStat key={s.label} {...s} />
        ))}
      </div>
    </motion.section>
  );
}
