import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Description,
  Label,
  ListBox,
} from "@heroui/react";
import { SparklesIcon } from "lucide-react";
import { MotionContainer } from "motion-provider";
import { useState } from "react";
import avatars, { type AvatarItem } from "@/constants/avatars.data";
import { cn } from "@/lib/utils";
import { useCircle } from "@/providers/circle.provider";
import { arraysEqual } from "@/utils/arraysEqual";

export function CircleList({ className }: { className?: string }) {
  const { setAnimations, animations, setTransition } = useCircle();

  const currentAvatar = avatars.find((item) =>
    arraysEqual(item.animationKeys, animations),
  )?.id;

  return (
    <ListBox
      aria-label="Select an animation preset"
      className={cn(
        "h-48 w-2xs overflow-y-auto rounded-2xl bg-glass-surface backdrop-blur-xl",
        className,
      )}
      selectionMode="single"
      disallowEmptySelection
      selectedKeys={currentAvatar ? [currentAvatar] : []}
      onSelectionChange={(keys) => {
        if (keys === "all") return;
        const [id] = keys;
        if (id === undefined) return;
        const item = avatars.find((avatar) => avatar.id === id);
        if (!item) return;
        if (item.animationKeys) setAnimations(item.animationKeys);
        if (item.transition) setTransition(item.transition);
      }}
    >
      {avatars.map((avatar) => (
        <ListBoxItem {...avatar} key={avatar.id} />
      ))}
      <EmptyListBoxItem />
    </ListBox>
  );
}

const EmptyListBoxItem = () => (
  <ListBox.Item isDisabled textValue="Countless Predefined Animations">
    <Avatar className="size-5" size="md">
      <SparklesIcon className="text-amber-500" />
    </Avatar>
    <div className="flex flex-col">
      <Label>+Countless Predefined Animations</Label>
      <Description>46,200 combination possibilities</Description>
    </div>
    <ListBox.ItemIndicator />
  </ListBox.Item>
);

const ListBoxItem = ({
  animationKeys,
  desc,
  id,
  src,
  title,
  transition,
}: AvatarItem) => {
  const [trigger, setTrigger] = useState(false);
  const handleMouseEnter = () => setTrigger(true);
  const handleMouseLeave = () => setTrigger(false);

  return (
    <ListBox.Item
      key={id}
      id={id}
      textValue={title}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="data-[focused=true]:bg-accent/10"
    >
      <MotionContainer
        animation={{
          mode: trigger ? animationKeys : "default",
          duration: 1,
          transition,
        }}
        controller={{
          trigger,
        }}
        key={id}
      >
        <Avatar className="size-5.5" size="md">
          <AvatarImage src={src} />
          <AvatarFallback>M</AvatarFallback>
        </Avatar>
      </MotionContainer>
      <div className="flex flex-col relative">
        <Label className="flex items-center justify-center">
          {title}{" "}
          <Badge
            color="accent"
            variant="soft"
            size="sm"
            className="px-0.5 relative border-none -ml-1 mt-1"
          >
            {transition}
          </Badge>
        </Label>
        <Description>{desc}</Description>
      </div>
      <ListBox.ItemIndicator />
    </ListBox.Item>
  );
};
