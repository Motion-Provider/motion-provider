import { Alert, Chip } from "@heroui/react";
import { MotionContainer } from "motion-provider";
import data from "@/constants/showcase.data";
import { getAnimation } from "@/lib/motion";
import { useShowcase } from "@/providers/showcase.provider";
import type { ShowcaseItem } from "@/types/showcase.type";
import { CountDigit } from "../count-digit";
import { ShowcaseComponent } from "./showcase-component";

export function ShowcasePreview() {
  return (
    <div className="size-full grid place-items-center overflow-hidden relative rounded-r-3xl">
      <Description />
      <ShowcaseComponent />
      <SlotDigit />
    </div>
  );
}

const descAnimation = getAnimation("showcasePreviewDescription");

function Description() {
  const { selected } = useShowcase();

  const item: ShowcaseItem | undefined = data.find((i) => i.id === selected);

  if (!item) return null;

  const { desc, title, type } = item;

  return (
    <MotionContainer
      {...descAnimation}
      key={selected}
      className="absolute w-full mb-auto top-0"
    >
      <Alert
        className=" backdrop-blur-2xl z-50 relative overflow-hidden rounded-none bg-transparent"
        status="accent"
      >
        {/* <div className="size-48 blur-2xl absolute top-0 left-0 bg-accent/20" /> */}
        <Alert.Content>
          <Alert.Title className="font-secondary tracking-widest inline-flex items-center gap-1">
            {title}
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

  const slot: ShowcaseItem["slot"] =
    data.find((i) => i.id === selected)?.slot ?? 0;

  if (Number.isNaN(slot)) return null;

  const digit = (slot + 1).toString().padStart(2, "0");

  return (
    <div className="absolute top-12 right-12 bg-linear-to-t from-muted/20 to-transparent bg-clip-text -z-10">
      <CountDigit
        digit={digit}
        className="text-9xl text-transparent font-semibold"
      />
    </div>
  );
}
