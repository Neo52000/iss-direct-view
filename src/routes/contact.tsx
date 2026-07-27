import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { sendContactMessage } from "@/lib/contact.functions";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — ISS Direct France" },
      { name: "description", content: "Contactez l'équipe ISS Direct France." },
      { property: "og:title", content: "Contact — ISS Direct France" },
      { property: "og:description", content: "Une question, un partenariat ? Écrivez-nous." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await sendContactMessage({ data: { name, email, message } });
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de l'envoi. Réessayez.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-2xl px-4 py-12 md:px-6">
      <h1 className="font-display text-3xl font-extrabold md:text-5xl">Contact</h1>
      <p className="mt-3 text-white/70">
        Question, suggestion, proposition de partenariat ? Écrivez-nous.
      </p>

      {done ? (
        <div className="iss-card mt-8 flex flex-col items-center p-10 text-center">
          <Check className="h-12 w-12 text-[color:var(--iss-ok)]" />
          <p className="mt-4 font-display text-xl font-bold">Message envoyé !</p>
          <p className="mt-2 text-white/70">Nous vous répondrons dans les meilleurs délais.</p>
        </div>
      ) : (
        <form className="iss-card mt-8 flex flex-col gap-3 p-6" onSubmit={handleSubmit}>
          <input
            required
            maxLength={100}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Votre nom"
            className="rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm outline-none focus:border-[color:var(--iss-blue)]"
          />
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.fr"
            className="rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm outline-none focus:border-[color:var(--iss-blue)]"
          />
          <textarea
            required
            minLength={10}
            maxLength={5000}
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Votre message"
            className="rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm outline-none focus:border-[color:var(--iss-blue)]"
          />
          {error && (
            <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">{error}</p>
          )}
          <button
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[color:var(--iss-blue)] px-5 py-3 text-sm font-semibold disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {loading ? "Envoi…" : "Envoyer"}
          </button>
        </form>
      )}
    </section>
  );
}
