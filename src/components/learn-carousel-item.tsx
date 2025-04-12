import { Card, CardContent } from "./ui/card";
import { CarouselItem } from "./ui/carousel";

export const LearnCarouselItem = () => {
  return (
    <CarouselItem className="size-full">
      <div className="size-full">
        <Card className="size-full">
          <CardContent className="flex size-full items-center justify-center">
            <span className="text-4xl font-semibold">I LOVE YOU BEJBA</span>
          </CardContent>
        </Card>
      </div>
    </CarouselItem>
  );
};
