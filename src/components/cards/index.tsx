import cards from "@/constants/cards";
import { cn, MotionChain } from "@/motion-provider";
import { Card } from "./card";

export const Cards = () => (
  <div className="w-auto lg:min-w-5xl min-w-xl mx-auto lg:h-72 h-auto  rounded-2xl flex lg:flex-wrap flex-col items-center justify-center mt-8 overflow-hidden z-50">
    <MotionChain
      animations={cards.map((_, i) => ({
        mode: i % 2 === 0 ? "fadeUp" : "fadeDown",
        transition: "gentle",
        duration: 1,
        delay: 3.5,
      }))}
      elementType="div"
      config={{
        delayLogic: "linear",
        duration: 0.3,
      }}
      className={cn(
        "bg-linear-to-b from-muted-foreground/10 to-muted-foreground/5 size-1/2 backdrop-blur-sm relative"
      )}
    >
      {(cards as typeof cards).map((card) => (
        <Card
          key={card.title}
          id={card.id}
          title={card.title}
          desc={card.desc}
          img={card.img}
          ico={card.ico}
        />
      ))}
    </MotionChain>
  </div>
);
