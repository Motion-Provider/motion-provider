import { Alert, Chip } from "@heroui/react";
import { MotionContainer, MotionText } from "motion-provider";
import data from "@/constants/showcase.data";
import { useShowcase } from "@/providers/showcase.provider";
import type { ShowcaseItem } from "@/types/types-showcase";
import { ShowcaseComponent } from "./showcase-component";

export function ShowcasePreview() {
  return (
    <div className="size-full grid place-items-center overflow-hidden relative">
      <Description />
      <ShowcaseComponent />
      {/* <SlotDigit /> */}
    </div>
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
        mode: ["fadeDown", "filterBlurIn"],
        duration: 0.8,
        transition: "gentle",
      }}
      key={selected}
      className="absolute w-full mb-auto top-0"
    >
      <Alert
        className="bg-surface/20 backdrop-blur-2xl z-50 relative overflow-hidden rounded-none"
        status="accent"
      >
        <div className="size-48 blur-2xl absolute top-0 left-0 bg-accent/20" />
        <Alert.Content>
          <Alert.Title className="font-secondary tracking-widest inline-flex items-center gap-1">
            {title}{" "}
            <Chip
              variant="soft"
              color="accent"
              className="rounded-full text-[10px] font-primary tracking-normal"
              size="sm"
            >
              {type}
            </Chip>
          </Alert.Title>
          <Alert.Description className="tracking-tighter text-xs max-w-md">
            {desc}
          </Alert.Description>
        </Alert.Content>
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
      wrapperClassName="absolute bottom-6 left-6 text-muted "
    >
      {digit}
    </MotionText>
  );
}
