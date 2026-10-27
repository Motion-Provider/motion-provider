import { Accordion } from "@heroui/react";
import { MotionChain } from "motion-provider";
import { FaqItem } from "@/components/faq-item";
import data from "@/constants/faq.data";

const headline = [
  <span key="questions">Questions</span>,
  <span key="answered" className="text-muted pl-3">
    answered.
  </span>,
];

export default function FaqSection() {
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center gap-24">
      <h2 className="text-6xl tracking-tighter text-center">
        <MotionChain
          animations={headline.map((_, i) => ({
            mode: ["filterBlurIn", "fadeIn"],
            delay: i * 0.88,
          }))}
          elementType="span"
        >
          {headline}
        </MotionChain>
      </h2>
      <Accordion className="w-full max-w-4xl">
        <MotionChain
          animation={{
            mode: ["fadeUp", "filterBlurIn"],
            transition: "gentle",
          }}
        >
          {data.map(({ id, ...item }) => (
            <FaqItem key={id} {...item} />
          ))}
        </MotionChain>
      </Accordion>
    </section>
  );
}
