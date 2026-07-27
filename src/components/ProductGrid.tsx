import { Star } from "lucide-react";
import { motion } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import { fetchActiveProducts, trackClickAndOpen } from "@/lib/products";
import { affiliateProducts } from "@/data/products";
import { Skeleton } from "@/components/ui/skeleton";
import { fadeUp, revealOnView } from "@/lib/motion";

export function ProductGrid() {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products", "active"],
    queryFn: fetchActiveProducts,
  });

  // Fallback statique en cas de chargement initial (SSR/avant DB)
  const items =
    products.length > 0
      ? products
      : isLoading
        ? []
        : affiliateProducts.map((p) => ({
            id: p.id,
            title: p.title,
            price: p.price,
            rating: p.rating,
            category: p.category,
            image_emoji: p.image,
            image_url: null as string | null,
            affiliate_url: p.affiliateUrl,
            badge: p.badge ?? null,
          }));

  return (
    <section className="bg-white py-16 text-[#0b1530]">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col items-start gap-2">
          <span className="rounded-full bg-[#0b1530]/5 px-3 py-1 text-xs font-semibold text-[#0b1530]/70">
            Boutique
          </span>
          <h2 className="font-display text-3xl font-extrabold md:text-4xl">
            Notre sélection pour explorer l'espace
          </h2>
          <p className="text-[#0b1530]/70">
            Une sélection d'objets pour observer, apprendre et rêver. Certains liens peuvent être
            affiliés.
          </p>
        </div>

        <motion.div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" {...revealOnView}>
          {isLoading && products.length === 0
            ? Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col overflow-hidden rounded-2xl border border-[#0b1530]/10 bg-white"
                >
                  <Skeleton className="aspect-square w-full rounded-none" />
                  <div className="flex flex-col gap-3 p-5">
                    <Skeleton className="h-3 w-20 bg-[#0b1530]/10" />
                    <Skeleton className="h-5 w-full bg-[#0b1530]/10" />
                    <Skeleton className="h-4 w-24 bg-[#0b1530]/10" />
                    <Skeleton className="mt-2 h-8 w-full bg-[#0b1530]/10" />
                  </div>
                </div>
              ))
            : items.map((p) => (
                <motion.article
                  key={p.id}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  className="flex flex-col overflow-hidden rounded-2xl border border-[#0b1530]/10 bg-white shadow-sm transition-shadow hover:shadow-lg"
                >
                  <div className="relative grid aspect-square place-items-center bg-gradient-to-br from-[#eef3ff] to-[#dbe7ff] text-7xl">
                    {p.image_url ? (
                      <img
                        src={p.image_url}
                        alt={p.title}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span aria-hidden>{p.image_emoji}</span>
                    )}
                    {p.badge ? (
                      <span className="absolute left-3 top-3 rounded-full bg-[#FFB020] px-2.5 py-1 text-xs font-bold text-[#3a2900]">
                        {p.badge}
                      </span>
                    ) : null}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#2F80FF]">
                      {p.category}
                    </span>
                    <h3 className="mt-1 font-display text-lg font-bold leading-snug">{p.title}</h3>
                    <div className="mt-2 flex items-center gap-1 text-sm">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < Math.round(Number(p.rating)) ? "fill-[#FFB020] text-[#FFB020]" : "text-[#0b1530]/20"}`}
                        />
                      ))}
                      <span className="ml-1 text-[#0b1530]/60">{Number(p.rating).toFixed(1)}</span>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-4">
                      <span className="font-display text-xl font-extrabold">{p.price}</span>
                      <button
                        onClick={() => trackClickAndOpen(p.id, p.affiliate_url)}
                        className="rounded-full bg-[#0b1530] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2F80FF]"
                      >
                        Voir le produit
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
        </motion.div>

        <p className="mt-6 text-xs text-[#0b1530]/50">
          Certains liens peuvent être affiliés. Cela peut nous reverser une commission sans surcoût
          pour vous.
        </p>
      </div>
    </section>
  );
}
