import { Moon, Sun } from "lucide-react";
import { IconButton } from "../components/controls";
import { useTheme } from "../hooks/use-theme";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <IconButton
      icon={theme === "dark" ? Sun : Moon}
      label={theme === "dark" ? "Use light theme" : "Use dark theme"}
      onPress={toggle}
    />
  );
}
