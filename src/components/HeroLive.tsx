import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { LiveVideo } from "./LiveVideo";
import { IssStatusCard } from "./IssStatusCard";
import { NextPassCard } from "./NextPassCard";
import { Radar } from "./Radar";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function HeroLive() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 md:px-6 md:pt-14">
        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <motion.div
            className="flex flex-col"
            initial="hidden"
            animate="show"
            variants={staggerContainer}
          >
            <motion.span
              variants={fadeUp}
              className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-white/70"
            >
              <Radar color="var(--iss-ok)" />
              Données ISS en temps réel
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl"
            >
              Regardez la Terre depuis l'ISS{" "}
              <span className="text-shimmer bg-gradient-to-r from-[color:var(--iss-cyan)] via-[color:var(--iss-blue)] to-[color:var(--iss-cyan)] bg-clip-text text-transparent">
                en direct
              </span>
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-base text-white/70 md:text-lg">
              Live vidéo de la Station Spatiale Internationale, position en temps réel et prochains
              passages visibles au-dessus de chez vous.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-3">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link
                  to="/live"
                  className="inline-flex items-center gap-2 rounded-full bg-[color:var(--iss-blue)] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[color:var(--iss-blue)]/30 transition-shadow hover:shadow-xl hover:shadow-[color:var(--iss-blue)]/50"
                >
                  Voir le direct
                </Link>
              </motion.div>
              <motion.a
                href="#alertes"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-semibold hover:bg-white/10"
              >
                Recevoir les alertes
              </motion.a>
            </motion.div>
            <motion.p variants={fadeUp} className="mt-5 max-w-xl text-xs text-white/40">
              Flux vidéo fourni par NASA / YouTube. Des interruptions peuvent se produire lors des
              pertes de signal.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-6">
              <LiveVideo />
            </motion.div>
          </motion.div>

          <motion.aside
            className="flex flex-col gap-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            <IssStatusCard />
            <NextPassCard />
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
