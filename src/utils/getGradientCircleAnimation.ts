import { GetGradientCircleAnimation, RouteItemProps } from "@/interfaces";

export default function getGradientCircleAnimation(
  route: string
): ReturnType<GetGradientCircleAnimation> {
  switch (route.slice(1).toLowerCase() as RouteItemProps["url"]) {
    case "learn":
      return "moveToRightTop";
    case "play":
      return "moveToLeftBottom";
    case "engines":
      return "moveToRightBottom";
    case "examples":
      return "moveToTopCenter";
    default:
      return ["moveToLeftTop", "fadeIn"];
  }
}
