import { toast } from "@heroui/react";

export function report(message: string, error = false): void {
  if (error) toast.danger(message, { timeout: 7500 });
  else toast.success(message, { timeout: 4500 });
}
