import { Download, GraduationCap } from "lucide-react";

export function KitSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#FFB020] to-[#FF8A00] p-8 text-[#2a1a00] md:p-12">
        <div className="grid items-center gap-6 md:grid-cols-[1.4fr_1fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-black/10 px-3 py-1 text-xs font-bold uppercase tracking-wider">
              <GraduationCap className="h-3.5 w-3.5" /> Pédagogie
            </span>
            <h2 className="mt-3 font-display text-3xl font-extrabold md:text-4xl">
              Kit espace à imprimer
            </h2>
            <p className="mt-3 text-[#2a1a00]/80">
              Téléchargez un kit gratuit pour les enfants : activités, coloriages, quiz et fiches
              pédagogiques sur l'ISS et le système solaire.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="/ressources"
                className="inline-flex items-center gap-2 rounded-full bg-[#0b1530] px-5 py-3 text-sm font-semibold text-white hover:bg-black"
              >
                <Download className="h-4 w-4" /> Télécharger gratuitement
              </a>
              <span className="inline-flex items-center rounded-full border border-[#2a1a00]/30 px-4 py-2 text-xs font-semibold">
                Pack complet enseignant — bientôt
              </span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {["🚀", "🪐", "🌒", "👨‍🚀", "🛰️", "✏️"].map((e, i) => (
              <div
                key={i}
                className="grid aspect-square place-items-center rounded-2xl bg-white text-4xl shadow-sm"
                aria-hidden
              >
                {e}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CommerceBenefits() {
  const items = [
    "Paiement sécurisé",
    "Livraison rapide",
    "Retour facile",
    "Support client",
  ];
  return (
    <div className="bg-white py-6 text-[#0b1530]">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 text-center text-sm font-semibold md:grid-cols-4 md:px-6">
        {items.map((i) => (
          <div key={i} className="rounded-xl bg-[#f5f7fb] py-3">
            {i}
          </div>
        ))}
      </div>
    </div>
  );
}