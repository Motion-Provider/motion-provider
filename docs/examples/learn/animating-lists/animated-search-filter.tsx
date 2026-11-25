"use client";

import { Card, Description, Label, SearchField } from "@heroui/react";
import { type AnimationResult, MotionContainer } from "motion-provider";
import { memo, useCallback, useEffect, useState } from "react";
import { useDebouncedValue } from "../../../../apps/landing/src/hooks/use-debounced-value";
import data from "./list.data.json";

type Contact = (typeof data)[number];

type ListItem = {
  item: Contact;
  isExiting: boolean;
};

const Item = memo(function Item({
  item,
  isExiting,
  onExited,
}: {
  item: Contact;
  isExiting: boolean;
  onExited: (id: Contact["id"]) => void;
}) {
  const handleMotionComplete = useCallback(
    ({ status }: AnimationResult) => {
      if (status === "finished" && isExiting) {
        onExited(item.id);
      }
    },
    [isExiting, item.id, onExited],
  );

  return (
    <MotionContainer
      animation={{
        mode: "fadeDown",
        duration: 0.48,
        delay: 0,
      }}
      controller={{
        trigger: !isExiting,
      }}
      onMotionComplete={handleMotionComplete}
    >
      <Card
        className="flex-row items-center justify-between gap-2 bg-transparent hover:bg-accent/10 py-1"
        variant="tertiary"
      >
        <Label className="min-w-0 truncate">
          {item.first_name}{" "}
          <span className="text-accent">{item.last_name}</span>
        </Label>

        <Description className="min-w-0 max-w-1/2 truncate">
          {item.email}
        </Description>
      </Card>
    </MotionContainer>
  );
});

export default function AnimatingLists5() {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<ListItem[]>(() =>
    data.map((item) => ({ item, isExiting: false })),
  );

  const debouncedQuery = useDebouncedValue(300, query);

  useEffect(() => {
    const term = debouncedQuery.trim().toLowerCase();

    setItems((prev) => {
      const previousItems = new Map(
        prev.map((entry) => [entry.item.id, entry]),
      );

      return data.flatMap((item) => {
        const matches = `${item.first_name} ${item.last_name} ${item.email}`
          .toLowerCase()
          .includes(term);

        const previous = previousItems.get(item.id);

        if (matches) {
          if (previous && !previous.isExiting) return [previous];
          return [{ item, isExiting: false }];
        }

        if (!previous) return [];
        if (previous.isExiting) return [previous];

        return [{ item: previous.item, isExiting: true }];
      });
    });
  }, [debouncedQuery]);

  const handleExited = useCallback((id: Contact["id"]) => {
    setItems((current) => current.filter((entry) => entry.item.id !== id));
  }, []);

  const hasVisibleItems = items.some((item) => !item.isExiting);

  return (
    <div className="my-4 flex h-60 w-full min-w-0 max-w-sm flex-col gap-3 px-3">
      <SearchField
        aria-label="Search contacts"
        value={query}
        onChange={setQuery}
        onClear={() => setQuery("")}
        className="shrink-0 mt-3"
      >
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input
            className="min-w-0"
            placeholder="Search by name or email..."
          />
          <SearchField.ClearButton />
        </SearchField.Group>
      </SearchField>

      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto">
        {items.map(({ item, isExiting }) => (
          <Item
            item={item}
            isExiting={isExiting}
            onExited={handleExited}
            key={item.id}
          />
        ))}

        {!hasVisibleItems && (
          <span className="my-auto py-4 text-center">
            No matching contacts found.
          </span>
        )}
      </div>
    </div>
  );
}
