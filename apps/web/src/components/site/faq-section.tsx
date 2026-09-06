import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@charm/ui/accordion";
import { SectionHeading } from "@/components/shared/section-heading";

type Faq = { question: string; answer: string };

/**
 * The FAQ answers were previously only present inside a JSON-LD block, with no
 * visible counterpart on the page. Google requires FAQ markup to reflect
 * content the user can actually see, so the questions are rendered here and the
 * schema is emitted alongside them.
 */
export function FaqSection({ faqs }: { faqs: Faq[] }) {
  if (faqs.length === 0) return null;

  return (
    <section id="faq" className="relative overflow-hidden bg-secondary/5 py-12 sm:py-16 md:py-24">
      <div className="container relative z-10 mx-auto px-4 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <SectionHeading
            title="Frequently Asked"
            highlight="Questions"
            description="Common questions about working with a freelance developer in Sri Lanka."
          />

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={faq.question} value={`faq-${index}`}>
                <AccordionTrigger className="text-left text-base sm:text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
