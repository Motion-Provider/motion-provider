import { Accordion } from "@heroui/react";
import { MotionChain } from "motion-provider";
import { FaqItem } from "@/components/faq-item";
import data from "@/constants/faq.data";
import { getAnimation } from "@/lib/motion";

const headline = [
  "Questions",
  <span key="answered" className="text-muted md:pl-3 pl-1.5">
    answered.
  </span>,
];

const titleAnimation = getAnimation("faqTitle");
const accordionAnimation = getAnimation("faqAccordion");

export default function FaqSection() {
  return (
    <section
      className="w-full h-auto flex flex-col items-center justify-center md:gap-24 gap-10 py-28 md:px-0 px-4"
      id="faq"
    >
      <h2 className="md:text-6xl text-4xl tracking-tighter text-center text-pretty">
        <MotionChain {...titleAnimation}>{headline}</MotionChain>
      </h2>
      <Accordion className="w-full max-w-4xl">
        <MotionChain {...accordionAnimation}>
          {data.map(({ id, ...item }) => (
            <FaqItem key={id} {...item} />
          ))}
        </MotionChain>
      </Accordion>
    </section>
  );
}
