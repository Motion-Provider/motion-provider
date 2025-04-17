import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { MotionProviderLibraryItemProps, SectionProps } from "@/interfaces";
import libraryLib from "@/lib/learn/library.lib";
import { cn } from "@/lib/utils";
import MotionContainer from "@/motion/motion-container";
import MotionText from "@/motion/motion-text";
import { RootState } from "@/redux";
import { useInView } from "motion/react";
import { FC, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";

const Header: FC<SectionProps> = ({ className }) => {
  const [data, setData] = useState<MotionProviderLibraryItemProps | null>(null);
  const ref = useRef<HTMLDivElement | null>(null);
  const document = useSelector((state: RootState) => state.document.objectID);
  const inView = useInView(ref, { once: false, amount: 0.5 });

  useMemo(() => {
    if (document) {
      const findObject = libraryLib.find((item) => item.id === document);
      if (findObject) setData(findObject);
    }
  }, [document]);

  if (!data) return <Skeleton className="h-12 my-8 py-8 dark w-full" />;

  return (
    <>
      <div
        className={cn(
          "flex items-start gap-4 flex-col justify-start",
          className
        )}
        ref={ref}
      >
        <div className="w-full items-center justify-between h-8 flex flex-row gap-2 font-secondary tracking-tighter">
          <MotionText
            elementType={"h1"}
            animation={{
              mode: ["fadeIn"],
              transition: "delayedElastic",
              duration: 1,
            }}
            config={{
              duration: 0.125,
              delayLogic: "sawtooth",
              mode: "words",
            }}
            children={data.title}
            wrapperClassName="text-2xl font-bold truncate"
          />
          <div className="w-auto rounded-full h-full bg-gradient-to-br from-cyan-400/10 to-transparent items-center justify-center flex flex-row px-4 py-2 gap-2">
            <span
              className={cn(
                "size-3 rounded-full animate-pulse",
                data.level === "beginner"
                  ? "bg-green-500"
                  : data.level === "intermediate"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              )}
            />
            <MotionText
              children={`${data.level} | Author: Burak Bilen`}
              animation={{
                mode: ["fadeIn", "depthPush"],
                transition: "quickEaseInOut",
                duration: 0.18,
              }}
              config={{
                mode: "chars",
                duration: 0.125,
                space: 1,
              }}
              elementType={"p"}
              wrapperClassName="font-secondary text-sm"
            />
          </div>
        </div>
        <Alert className="mt-4">
          <AlertTitle className="flex items-center gap-2">
            <data.icon />
            <span className="font-semibold"> Motion Provider | Docs</span>
          </AlertTitle>
          <AlertDescription className="tracking-tight">
            {data.desc}
          </AlertDescription>
        </Alert>
      </div>
      <MotionContainer
        animation={{
          mode: ["fadeIn", "filterBlurIn", "depthPush"],
          transition: "smooth",
          duration: 1,
          delay: 0.25,
        }}
        controller={{
          trigger: !inView,
        }}
        elementType={"div"}
        className={cn(
          "bg-cyan-900/20 backdrop-blur-md fixed top-8 max-w-md  -translate-x-1/2 left-1/2 rounded-full     py-3 items-center justify-center flex flex-col gap-1"
        )}
      >
        <div>
          <div className="flex items-center gap-2 justify-center">
            <data.icon className="size-5" />
            <span className="font-secondary text-sm">
              {" "}
              Motion Provider | Docs
            </span>
          </div>
          <MotionText
            animation={{
              mode: ["fadeUp", "filterBlurIn"],
              transition: "quickBounce",
              duration: 0.5,
              delay: 2,
            }}
            config={{
              duration: 0.5,
              mode: "words",
              space: 1,
              delayLogic: "cosine",
            }}
            controller={{
              trigger: !inView,
            }}
            elementType={"h2"}
            className="-mr-1 "
            children={`You're currently reading ${JSON.stringify(data.title)}`}
            wrapperClassName="tracking-tight text-xs truncate px-6"
          />
        </div>
      </MotionContainer>
    </>
  );
};

export default Header;
