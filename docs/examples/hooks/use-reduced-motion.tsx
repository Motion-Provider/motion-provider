"use client";

import { useReducedMotion } from "motion-provider";

export default function Demo() {
  const reduce = useReducedMotion();
  return <output>{reduce ? "Reduced motion requested" : "Standard motion"}</output>;
}
