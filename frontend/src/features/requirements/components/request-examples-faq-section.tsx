import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Eyebrow } from "@/components/common/eyebrow";

import {
  REQUEST_EXAMPLES,
  REQUIREMENT_FAQS,
} from "../data/tell-us-what-you-need.content";

/** Bottom section: example request categories beside a FAQ accordion. */
export function RequestExamplesFaqSection() {
  return (
    <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
      <div>
        <Eyebrow>Examples of Requests</Eyebrow>
        <h2 className="text-ink mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
          What Can You Request?
        </h2>

        <ul className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-3">
          {REQUEST_EXAMPLES.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="border-border bg-surface flex flex-col items-center gap-2 rounded-xl border p-4 text-center"
            >
              <span className="bg-brand-blue-light text-brand-blue inline-flex size-10 items-center justify-center rounded-full">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <span className="text-ink text-xs leading-tight font-semibold">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <Eyebrow>Frequently Asked Questions</Eyebrow>
        <h2 className="text-ink mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
          Questions About Your Request
        </h2>

        <Accordion type="single" collapsible className="mt-6">
          {REQUIREMENT_FAQS.map(({ question, answer }) => (
            <AccordionItem key={question} value={question}>
              <AccordionTrigger>{question}</AccordionTrigger>
              <AccordionContent>{answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
