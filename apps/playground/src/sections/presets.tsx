"use client";

import { Button, Card } from "@heroui/react";
import {
  Activity,
  GalleryHorizontalEnd,
  Grid2x2,
  HelpCircle,
  Image,
  LayoutTemplate,
  Mail,
  Menu,
  MessageSquareQuote,
  MousePointer2,
  Orbit,
  PanelsTopLeft,
  Wallet,
} from "lucide-react";
import { TEMPLATES, type Template } from "../constants/templates.data";

const icons = {
  hero: Orbit,
  cta: MousePointer2,
  features: Grid2x2,
  pricing: Wallet,
  testimonial: MessageSquareQuote,
  gallery: Image,
  faq: HelpCircle,
  newsletter: Mail,
  navigation: Menu,
  activity: Activity,
};

export function Presets({
  current,
  onPick,
}: {
  current?: string;
  onPick: (template: Template) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {TEMPLATES.map((template) => {
        const Icon = icons[template.icon] ?? LayoutTemplate;
        return (
          <Card
            key={template.id}
            className="flex min-w-0 flex-col gap-0 rounded-xl border border-[var(--stroke)] bg-[var(--panel)] p-0 shadow-none"
          >
            <div className="relative grid h-24 place-items-center overflow-hidden rounded-t-xl border-b border-[var(--stroke)] bg-[var(--canvas)] bg-[radial-gradient(var(--grid)_1px,transparent_1px)] bg-[size:15px_15px]">
              <div className="grid size-12 place-items-center rounded-xl border border-[var(--accent-stroke)] bg-[var(--tint)] text-accent">
                <Icon size={23} strokeWidth={1.6} />
              </div>
            </div>
            <div className="grid flex-1 content-start gap-1.5 p-4">
              <h2 className="font-semibold">{template.name}</h2>
              <p className="text-sm leading-relaxed text-muted">
                {template.description}
              </p>
            </div>
            <div className="px-4 pb-4">
              <Button
                variant={current === template.id ? "secondary" : "outline"}
                size="sm"
                className="rounded-md border-[var(--stroke)]"
                onPress={() => onPick(template)}
              >
                {current === template.id ? (
                  <PanelsTopLeft size={15} />
                ) : (
                  <GalleryHorizontalEnd size={15} />
                )}
                {current === template.id ? "Open in playground" : "Use preset"}
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
