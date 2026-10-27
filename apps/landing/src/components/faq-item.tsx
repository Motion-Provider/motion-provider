import { Accordion } from "@heroui/react";
import type data from "@/constants/faq.data";

export function FaqItem({ q, a }: Omit<(typeof data)[number], "id">) {
  return (
    <Accordion.Item key={q}>
      <Accordion.Heading>
        <Accordion.Trigger>
          {q}
          <Accordion.Indicator />
        </Accordion.Trigger>
      </Accordion.Heading>
      <Accordion.Panel>
        <Accordion.Body>{a}</Accordion.Body>
      </Accordion.Panel>
    </Accordion.Item>
  );
}
