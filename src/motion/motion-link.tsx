import { FC, useCallback } from "react";
import { MotionLinkProps } from "./types";
import { useRouter } from "next/router";
import Link from "next/link";

const MotionLink: FC<MotionLinkProps> = ({
  children,
  href,
  onReverse,
  timer,
}) => {
  const router = useRouter();

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      onReverse?.();

      setTimeout(() => {
        router.push(href);
      }, timer);
    },
    [href, onReverse, router, timer]
  );

  return (
    <Link href={href} passHref legacyBehavior={true}>
      <a onClick={handleClick} style={{ display: "contents" }}>
        {children}
      </a>
    </Link>
  );
};

export default MotionLink;
