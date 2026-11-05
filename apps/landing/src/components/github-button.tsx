import { Button, type ButtonProps } from "@heroui/react";
import Link from "next/link";
import { GithubIcon } from "./icons/github-icon";

type LinkProps = React.ComponentProps<typeof Link>;

interface Props extends LinkProps {
  buttonProps?: ButtonProps;
}

export function GithubButton({ buttonProps, ...linkProps }: Props) {
  return (
    <Link {...linkProps}>
      <Button {...buttonProps}>
        <GithubIcon />
      </Button>
    </Link>
  );
}
