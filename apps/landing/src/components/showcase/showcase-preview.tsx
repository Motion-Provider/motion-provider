import { Alert, Chip } from "@heroui/react";
import { MotionContainer } from "motion-provider";
import data from "@/constants/showcase.data";
import { getAnimation } from "@/lib/motion";
import { useShowcase } from "@/providers/showcase.provider";
import type { ShowcaseItem } from "@/types/showcase.type";
import { ShowcaseComponent } from "./showcase-component";

export function ShowcasePreview() {
  return (
    <div className="size-full grid place-items-center overflow-hidden relative rounded-r-3xl">
      <Description />
      <ShowcaseComponent />
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
