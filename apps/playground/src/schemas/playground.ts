import { z } from "zod";
import type { Device, Scope, View } from "../types/playground";

const VIEWS = ["preview", "code"] as const;
const SCOPES = ["individual", "batch"] as const;
const DEVICES = ["desktop", "mobile"] as const;

export interface ViewState {
  view: View;
  scope: Scope;
  device: Device;
  before: boolean;
}

export const DEFAULT_VIEW_STATE = {
  view: "preview",
  scope: "individual",
  device: "desktop",
  before: false,
} as const satisfies ViewState;

const viewStateSchema = z.object({
  view: z.enum(VIEWS).catch(DEFAULT_VIEW_STATE.view),
  scope: z.enum(SCOPES).catch(DEFAULT_VIEW_STATE.scope),
  device: z.enum(DEVICES).catch(DEFAULT_VIEW_STATE.device),
  before: z.boolean().catch(DEFAULT_VIEW_STATE.before),
});

export function readViewState(params: URLSearchParams): ViewState {
  return viewStateSchema.parse({
    view: params.get("view"),
    scope: params.get("scope"),
    device: params.get("device"),
    before: params.get("compare") === "original",
  });
}

export const themeSchema = z.enum(["dark", "light"]).catch("dark");
export type Theme = z.infer<typeof themeSchema>;

export const persistedDraftSchema = z.object({
  html: z.string(),
  template: z.string().nullish(),
});
