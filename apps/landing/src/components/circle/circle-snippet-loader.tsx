"use client";

import { Spinner } from "@heroui/react";
import { MotionContainer, useController } from "motion-provider";
import { useState } from "react";
import { useDebouncedFn } from "@/hooks/use-debounced-fn";
import { cn } from "@/lib/utils";

type CircleSnippetLoaderProps = {
  keys: string;
  className?: string;
};

export function CircleSnippetLoader({
  keys,
  className,
}: CircleSnippetLoaderProps) {
  const controller = useController();
  const [hasPlayed, setHasPlayed] = useState<boolean>(false);

  useDebouncedFn(10, () => {
    setHasPlayed(true);
    controller.play();
  }, [keys]);

  return (
    <MotionContainer
      animation={{
        mode: ["filterBlurIn", "fadeIn"],
        duration: 1.5,
        direction: "reverse",
        transition: "slowCubic",
      }}
      controller={controller}
      aria-hidden={!hasPlayed}
      className={cn(
        "size-auto top-3 right-3 absolute",
        !hasPlayed && "invisible",
        className,
      )}
    >
      <Spinner
        color="accent"
        size="sm"
        className="motion-reduce:animate-none"
      />
    </MotionContainer>
  );
}
