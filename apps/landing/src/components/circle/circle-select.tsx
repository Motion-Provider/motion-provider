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
      onChange={handleValueChange}
    >
      <Select.Trigger>
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
      <Select.Popover>
        <ListBox>
          {avatars.map((avatar) => (
            <ListBox.Item
              key={avatar.id}
              id={avatar.id}
              textValue={avatar.title}
            >
              <Avatar className="size-5.5" size="md">
                <AvatarImage src={avatar.src} />
                <AvatarFallback>M</AvatarFallback>
              </Avatar>
              <div className="flex flex-col relative">
                <div className="gap-1">
                  <Label>{avatar.title}</Label>
                  <Badge
                    color="accent"
                    variant="soft"
                    size="sm"
                    className="px-0.5 relative m-0 border-none"
                  >
                    {avatar.transition}
                  </Badge>
                </div>
                <Description>{avatar.desc}</Description>
              </div>
              <ListBox.ItemIndicator />
            </ListBox.Item>
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
