import { motion } from "motion/react";
import { Radio, MapPin, Eye, BellRing } from "lucide-react";
import { fadeUp, revealOnView } from "@/lib/motion";

const FEATURES = [
  {
    icon: Radio,
    title: "Live ISS 24/7",
    text: "Regardez la Terre en direct depuis la Station Spatiale Internationale.",
  },
  {
    icon: MapPin,
    title: "Position en temps réel",
    text: "Suivez la position actuelle de l'ISS sur une carte interactive.",
  },
  {
    icon: Eye,
    title: "Passages au-dessus de chez vous",
    text: "Découvrez quand observer l'ISS à l'œil nu.",
  },
  {
    icon: BellRing,
    title: "Alertes personnalisées",
    text: "Recevez un email avant les prochains passages visibles.",
  },
];

export function FeatureCards() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <motion.div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" {...revealOnView}>
        {FEATURES.map((f) => (
          <motion.div key={f.title} variants={fadeUp} className="iss-card iss-card-interactive p-5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[color:var(--iss-blue)]/15 ring-1 ring-[color:var(--iss-blue)]/30">
              <f.icon className="h-5 w-5 text-[color:var(--iss-cyan)]" />
            </span>
            <h3 className="mt-4 font-display text-lg font-bold">{f.title}</h3>
            <p className="mt-1.5 text-sm text-white/70">{f.text}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
