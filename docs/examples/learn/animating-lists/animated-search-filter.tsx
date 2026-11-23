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
        className="flex-row items-center justify-between bg-transparent hover:bg-accent/10 py-1"
        variant="tertiary"
      >
        <Label>
          {item.first_name}{" "}
          <span className="text-accent">{item.last_name}</span>
        </Label>

        <Description className="max-w-2xs truncate">{item.email}</Description>
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
    <div className="dark my-4 flex w-84 flex-col gap-3 relative h-60 overflow-y-scroll">
      <SearchField
        aria-label="Search contacts"
        value={query}
        onChange={setQuery}
        onClear={() => setQuery("")}
        className="sticky top-0 z-10 w-full focus:ring-0"
      >
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input placeholder="Search by name or email..." />
          <SearchField.ClearButton />
        </SearchField.Group>
      </SearchField>

      <div className="flex flex-col gap-2 ">
        {items.map(({ item, isExiting }) => (
          <Item
            item={item}
            isExiting={isExiting}
            onExited={handleExited}
            key={item.id}
          />
        ))}

        {!hasVisibleItems && (
          <span className="py-4 mt-18 text-center absolute -translate-x-1/2 -translate-y-1/2 left-1/2 right-1/2 w-full">
            No matching contacts found.
          </span>
        )}
      </div>
    </div>
  );
}
