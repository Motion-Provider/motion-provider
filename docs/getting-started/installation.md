---
title: Installation
description: Install motion-provider in a React 19 project.
order: 10
---

## Requirements

React 19 (`react@^19.0.0` is a peer dependency).

## Install

```bash
npm i motion-provider
```

## Usage

```tsx
import { MotionContainer } from "motion-provider";

export function Dot() {
  return (
    <MotionContainer
      animation={{ mode: ["fadeIn", "filterBlurIn"] }}
      className="size-24 rounded-full bg-orange-500"
    />
  );
}
```
