import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

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

  const mailto = `mailto:contact@iss-direct-france.fr?subject=${encodeURIComponent(
    "Contact ISS Direct France — " + name,
  )}&body=${encodeURIComponent(message + "\n\n— " + name + " <" + email + ">")}`;

  return (
    <section className="mx-auto max-w-2xl px-4 py-12 md:px-6">
      <h1 className="font-display text-3xl font-extrabold md:text-5xl">Contact</h1>
      <p className="mt-3 text-white/70">
        Question, suggestion, proposition de partenariat ? Écrivez-nous.
      </p>
      <form
        className="iss-card mt-8 flex flex-col gap-3 p-6"
        onSubmit={(e) => {
          e.preventDefault();
          window.location.href = mailto;
        }}
      >
        <input
          required
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
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Votre message"
          className="rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm outline-none focus:border-[color:var(--iss-blue)]"
        />
        <button className="rounded-full bg-[color:var(--iss-blue)] px-5 py-3 text-sm font-semibold">
          Envoyer
        </button>
      </form>
    </section>
  );
}