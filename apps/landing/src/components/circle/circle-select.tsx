import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Description,
  type Key,
  Label,
  ListBox,
  Select,
} from "@heroui/react";
import { SparklesIcon } from "lucide-react";
import { MotionContainer } from "motion-provider";
import { useState } from "react";
import avatars, { type AvatarItem } from "@/constants/avatars.data";
import { cn } from "@/lib/utils";
import { useCircle } from "@/providers/circle.provider";
import { arraysEqual } from "@/utils/arraysEqual";

export function CircleSelect({ className }: { className?: string }) {
  const { setAnimations, animations, setTransition } = useCircle();

  const currentAvatar = avatars.find((item) =>
    arraysEqual(item.animationKeys, animations),
  )?.id;

  function handleValueChange(e: Key | Key[] | null) {
    if (e === null) return;

    const { animationKeys, transition } = avatars.find(
      (item) => item.id === e,
    ) as AvatarItem;

    if (animationKeys) setAnimations(animationKeys);
    if (transition) setTransition(transition);

    return;
  }

  return (
    <Select
      className={cn("w-2xs", className)}
      placeholder="Select an animation preset"
      aria-labelledby="Select an animation preset"
      value={currentAvatar}
      selectionMode="single"
      defaultOpen
      onChange={handleValueChange}
    >
      <Select.Trigger className="bg-glass-surface">
        <Select.Value>
          {({ defaultChildren, isPlaceholder, state }) => {
            if (isPlaceholder || state.selectedItems.length === 0)
              return defaultChildren;

            const item = avatars.find(
              (item) => item.id === state.selectedItems[0]?.key,
            );

            if (!item) return defaultChildren;
            return (
              <div className="flex items-center gap-2">
                <Avatar className="size-4" size="md">
                  <AvatarImage src={item.src} />
                  <AvatarFallback>{item.title}</AvatarFallback>
                </Avatar>
                <span>{item.title}</span>
              </div>
            );
          }}
        </Select.Value>
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover className="bg-glass-surface backdrop-blur-xl h-48">
        <ListBox>
          {avatars.map((avatar) => (
            <ListBoxItem {...avatar} key={avatar.id} />
          ))}
          <EmptyListBoxItem />
        </ListBox>
      </Select.Popover>
    </Select>
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
        <Label className="flex items-center justify-center ">
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
