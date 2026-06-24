import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { FaqItem } from "@/data/faq";

export function FAQ({ items, title = "Questions fréquentes" }: { items: FaqItem[]; title?: string }) {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 md:px-6">
      <h2 className="font-display text-3xl font-extrabold md:text-4xl">{title}</h2>
      <p className="mt-2 text-white/70">
        Tout ce qu'il faut savoir sur le live et l'observation de l'ISS.
      </p>
      <Accordion type="single" collapsible className="mt-8">
        {items.map((item, i) => (
          <AccordionItem
            key={i}
            value={`item-${i}`}
            className="border-b border-white/10 px-1"
          >
            <AccordionTrigger className="text-left font-display text-base font-bold hover:no-underline">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="text-white/75">{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}