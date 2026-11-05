import { Switch } from "@heroui/react";
import { TagPlusIcon, TagXIcon } from "lucide-react";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { useEngineLabels } from "@/providers/engine.provider";

export function EngineLabelsSwitch({
  ...props
}: React.ComponentProps<typeof Switch>) {
  const { showLabels, setShowLabels } = useEngineLabels();

  const isMobile = useIsMobile();
  if (isMobile) return null;

  return (
    <Switch isSelected={showLabels} onChange={setShowLabels} {...props}>
      {({ isSelected }) => (
        <Switch.Content className="*:rounded-full">
          <span className="text-shadow-glass-surface-strong">Show labels</span>
          <Switch.Control>
            <Switch.Thumb className="rounded-full">
              <Switch.Icon>
                {isSelected ? (
                  <TagPlusIcon className="size-3 text-inherit opacity-100" />
                ) : (
                  <TagXIcon className="size-3 text-inherit opacity-70" />
                )}
              </Switch.Icon>
            </Switch.Thumb>
          </Switch.Control>
        </Switch.Content>
      )}
    </Switch>
  );
}
