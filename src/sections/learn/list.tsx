import { MotionProviderLibraryItemProps, SectionProps } from "@/interfaces";
import { cn } from "@/lib/utils";
import { FC, useMemo, useState } from "react";
import { Search } from "./search";
import MotionText from "@/motion/motion-text";
import libraryLib from "@/lib/learn/library.lib";
import { ListItem } from "./list-item";
import MotionChain from "@/motion/motion-chain";
import { MotionAnimationProps } from "@/motion/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StickyFooter } from "@/components/sticky-footer";
import { FullscreenAlert } from "@/components/fullscreen-alert";
import Socials from "@/components/socials";
import LearnCarousel from "@/components/learn-carousel";

export const Home: FC<SectionProps> = ({ className }) => {
  const [library, setLibrary] =
    useState<MotionProviderLibraryItemProps[]>(libraryLib);
  const [search, setSearch] = useState<string>("");

  const listItemAnimations = library.map((_, idx) => ({
    mode:
      idx % 2 === 0
        ? ["filterBlurIn", "fadeRight"]
        : ["filterBlurIn", "fadeLeft"],
    duration: 0.5,
    delay: 2,
    transition: "smooth",
  })) as MotionAnimationProps[];

  useMemo(() => {
    if (search.length === 0) return setLibrary(libraryLib);
    return setLibrary(
      library.filter(
        (item) =>
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.desc.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  return (
    <section
      className={cn(
        "max-w-6xl mx-auto h-screen relative overflow-hidden dark",
        className
      )}
    >
      <div className="size-full z-50 items-center justify-center flex flex-col gap-2">
        <div className="h-1/12 w-full items-center justify-center flex ">
          <MotionText
            animation={{
              mode: ["filterBlurIn", "textShimmer"],
              transition: "easeIn",
              duration: 0.5,
              delay: 2,
            }}
            config={{
              duration: 0.25,
              mode: "chars",
              space: 1,
              delayLogic: "chaotic",
            }}
            elementType={"h1"}
            wrapperClassName="text-xl font-base font-secondary w-1/2"
          >
            Motion Provider | Docs
          </MotionText>
          <Search handleChange={(e) => setSearch(e)} value={search} />
        </div>
        <FullscreenAlert />
        <div className="size-full">
          <LearnCarousel />
          <div className="w-full bg-gradient-to-r from-[#2b75cffd]/10 to-transparent rounded-xl h-16 mt-14 border dark justify-between flex flex-row gap-2 px-4 items-center">
            <div className="w-1/2 flex flex-row gap-2 justify-start items-center">
              <p className="font-secondary text-sm">
                Total {library.length} archive found.
              </p>
            </div>
            <div className="w-1/2 flex flex-row gap-2 justify-end items-center ">
              <Socials />
            </div>
          </div>
          <ScrollArea className="h-[400px] w-full mt-2 ">
            <MotionChain
              animations={listItemAnimations}
              elementType={"ul"}
              config={{
                delayLogic: "perlin",
                duration: 0.25,
              }}
              controller={{
                configView: {
                  amount: "some",
                  once: false,
                },
              }}
            >
              {library.map((val, idx) => (
                <ListItem {...val} key={idx} />
              ))}
            </MotionChain>
          </ScrollArea>
        </div>
      </div>
      <StickyFooter className="bottom-4 left-1/2 -translate-x-1/2 absolute w-auto" />
    </section>
  );
};
