import { Alert, Chip } from "@heroui/react";
import { MotionContainer, MotionText } from "motion-provider";
import data from "@/constants/showcase.data";
import { useShowcase } from "@/providers/showcase.provider";
import type { ShowcaseItem } from "@/types/types-showcase";
import { ContainerWrapper } from "../container";
import { ShowcaseComponent } from "./showcase-component";

export function ShowcasePreview() {
  return (
    <>
      <div className="size-full -z-10 bg-linear-to-b from-transparent to-surface/20" />
      <ContainerWrapper<"div">
        as="div"
        width="lg"
        grid={{
          axis: "both",
          lineWidth: 1,
          opacity: 0.5,
          size: 120,
        }}
        className="absolute z-10 size-full"
        innerClassName="size-full relative flex items-center-safe justify-center-safe overflow-hidden"
      >
        <SlotDigit />
        <ShowcaseComponent />
        <Description />
      </ContainerWrapper>
    </>
  );
}

function Description() {
  const { selected } = useShowcase();

  const item: ShowcaseItem | undefined = data.find((i) => i.id === selected);

  if (!item) return null;

  const { desc, title, type } = item;

  return (
    <MotionContainer
      animation={{
        mode: ["fadeUp", "filterBlurIn"],
        duration: 0.8,
        transition: "gentle",
      }}
      key={selected}
      className="px-2 absolute w-full mt-auto bottom-2"
    >
      <Alert
        className="bg-surface/20 backdrop-blur-2xl z-50 border border-border relative overflow-hidden"
        status="accent"
      >
        <div className="size-48 blur-2xl absolute top-0 left-0 bg-accent/20" />
        <Alert.Content>
          <Alert.Title className="font-secondary tracking-widest">
            {title}
          </Alert.Title>
          <Alert.Description className="tracking-tighter text-xs">
            {desc}
          </Alert.Description>
        </Alert.Content>
        <Chip
          variant="soft"
          color="accent"
          className="rounded-full text-[10px] font-semibold"
          size="sm"
        >
          {type}
        </Chip>
      </Alert>
    </MotionContainer>
  );
}

function SlotDigit() {
  const { selected } = useShowcase();

  const slot: ShowcaseItem["slot"] | undefined = data.find(
    (i) => i.id === selected,
  )?.slot;

  if (Number.isNaN(slot) || typeof slot === "undefined") return null;

  const digit = (slot + 1).toString().padStart(2, "0");

  return (
    <MotionText
      animation={{ mode: ["fadeDown", "filterBlurIn"] }}
      config={{
        mode: "chars",
        space: 5,
      }}
      key={selected}
      className="text-2xl font-secondary"
      wrapperClassName="absolute top-4 left-4 text-muted "
    >
      {digit}
    </MotionText>
  );
}
