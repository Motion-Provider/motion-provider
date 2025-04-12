import { FC, useCallback, useState } from "react";
import { MotionLinkProps } from "./types";
import { useRouter } from "next/router";
import Link from "next/link";
import { cn } from "@/lib/utils";

const MotionLink: FC<MotionLinkProps> = ({
  children,
  href,
  onReverse,
  timer,
  className,
}) => {
  const router = useRouter();
  const [clicked, setClicked] = useState(false);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();

      if (clicked) return;

      setClicked(true);

      onReverse?.();

      setTimeout(() => {
        router.push(href);
      }, timer);
    },
    [href, onReverse, router, timer]
  );
  if (clicked) {
    return (
      <div
        className={cn("cursor-pointer", className)}
        style={{ display: "contents" }}
      >
        {children}
      </div>
    );
  }
  return (
    <Link
      href={href}
      passHref
      onClick={!clicked ? handleClick : undefined}
      className={cn("cursor-pointer", className)}
      style={{ display: "contents" }}
    >
      {children}
    </Link>
  );
};

export default MotionLink;
