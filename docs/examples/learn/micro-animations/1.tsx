import { Button, type ButtonProps, cn } from "@heroui/react";

interface Props extends ButtonProps {
  label?: string;
}

function Icon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className={cn("lucide lucide-arrow-up-right preview-icon", className)}
    >
      <title className="sr-only">Navigate</title>
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  );
}

export default function CtaButton({
  label = "Get Started",
  variant = "danger-soft",
  size = "md",
  ...props
}: Props) {
  return (
    <Button variant={variant} size={size} {...props}>
      {label} <Icon />
    </Button>
  );
}
