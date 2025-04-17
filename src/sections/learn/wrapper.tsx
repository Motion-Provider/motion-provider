import { WrapperProps } from "@/interfaces";
import { cn } from "@/lib/utils";
import { FC } from "react";

const Wrapper: FC<WrapperProps> = ({ className, children }) => {
  return (
    <main
      className={cn(
        "max-w-6xl mx-auto h-screen relative overflow-y-scroll dark",
        className
      )}
    >
      {children}
    </main>
  );
};

export default Wrapper;
