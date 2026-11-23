"use client";

import { Card, Description, Label, SearchField } from "@heroui/react";
import { MotionContainer } from "motion-provider";
import { useEffect, useState } from "react";
import data from "./list.data.json";

type UseDebounce = <T>(timeout: number, value: T) => T;

export const useDebouncedValue: UseDebounce = (timeout, value) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  if (Number.isNaN(timeout)) {
    throw new Error(
      `Invalid type of 'timeout' prop has passed, expected 'number' but passed: ${typeof timeout}`,
    );
  }

  useEffect(() => {
    const id = setTimeout(() => setDebouncedValue(value), timeout);
    return () => clearTimeout(id);
  }, [value, timeout]);

  return debouncedValue;
};

export default function AnimatingLists3() {
  const [query, setQuery] = useState("");

  const [items, setItems] = useState(() =>
    data.map((item) => ({ ...item, isExiting: false })),
  );

  const debouncedQuery = useDebouncedValue(300, query);

  useEffect(() => {
    const term = debouncedQuery.trim().toLowerCase();

    setItems((current) => {
      const existing = new Map(current.map((item) => [item.id, item]));

      return data.flatMap((item) => {
        const matches = `${item.first_name} ${item.last_name} ${item.email}`
          .toLowerCase()
          .includes(term);

        const previous = existing.get(item.id);

        if (matches) {
          return [{ ...item, isExiting: false }];
        }

        return previous ? [{ ...previous, isExiting: true }] : [];
      });
    });
  }, [debouncedQuery]);

  const hasVisibleItems = items.some((item) => !item.isExiting);

  return (
    <div className="w-84 dark my-8 flex flex-col gap-3">
      <SearchField
        aria-label="Search contacts"
        value={query}
        onChange={setQuery}
        onClear={() => setQuery("")}
      >
        <SearchField.Group>
          <SearchField.SearchIcon />
          <SearchField.Input placeholder="Search by name or email..." />
          <SearchField.ClearButton />
        </SearchField.Group>
      </SearchField>

      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <MotionContainer
            key={item.id}
            animation={{ mode: "fadeUp", duration: 0.36 }}
            controller={{ trigger: !item.isExiting }}
            onMotionComplete={({ status }) => {
              if (status !== "finished" || !item.isExiting) return;

              setItems((current) =>
                current.filter((entry) => entry.id !== item.id),
              );
            }}
          >
            <Card className="flex-row items-center justify-between bg-transparent hover:bg-accent/10">
              <Label>
                {item.first_name}{" "}
                <span className="text-accent">{item.last_name}</span>
              </Label>

              <Description className="max-w-2xs truncate">
                {item.email}
              </Description>
            </Card>
          </MotionContainer>
        ))}

        {!hasVisibleItems && (
          <Description className="py-4 text-center">
            No matching contacts found.
          </Description>
        )}
      </div>
    </div>
  );
}
