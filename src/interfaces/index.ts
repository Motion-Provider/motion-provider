import { IconType } from "react-icons";
import { AnimationKeys, MotionControllerProps } from "../motion/types";

/*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+**/

/* Component Interfaces */

export interface OverviewCardProps {
  title: string;
  desc: string;
  className?: string;
  link: string;
  icon: IconType;
}

export interface FullscreenPermissionProps {
  onClick: () => void;
}

export interface LearnCarouselProps {
  controller: MotionControllerProps;
}

export interface MotionTubeItemProps {
  children: React.ReactNode;
  currentItem: number;
}

export interface MotionTubeObjectProps {}

export interface LearnListProps {
  data: LearnListItemProps[];
  className?: string;
}
export interface LearnListItemProps {
  title: string;
  desc?: string;
}

/*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+**/

/* Sections Interfaces */

export interface SectionProps {
  className?: string;
}

export interface LearnSearchProps {
  handleChange: (e: string) => void;
  value: string;
}

export interface WrapperProps {
  children: React.ReactNode;
  className?: string;
}
/*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+**/

/* Hooks Interfaces */

export interface useIsMobileProps {
  isMobile: boolean;
}
/*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+**/

/* Redux Interfaces */

export interface ReduxCookieProps {
  activated: boolean;
}

export interface ReduxMotionProviderAnimationConnectorProps {}

export interface ReduxFullscreenProps {
  isFullscreen: boolean;
}

export interface ReduxDocumentProps {
  objectID: number | null;
}
/*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+**/

/* Utils Interfaces */

export type GetGradientCircleAnimation = (
  route: string
) => AnimationKeys[] | AnimationKeys;

/*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+**/

/* Db Interfaces */

/*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+**/

/* Provider Interfaces */

export interface ProviderStoreProps {
  children: React.ReactNode;
}
export interface ProviderLayoutProps {
  children: React.ReactNode;
  className: string;
}

/*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+**/

/* Lib Interfaces */

export interface RouteItemProps {
  title: string;
  url: string;
}

export interface MotionProviderLibraryItemProps {
  id: number;
  title: string;
  desc: string;
  link: string;
  level: MotionProviderLibraryItemLevelProps;
  icon: IconType;
}

export type MotionProviderLibraryItemLevelProps =
  | "beginner"
  | "intermediate"
  | "advanced";

export interface CarouselItemProps {
  id: number;
  desc: string;
  title: string;
  link: string;
  utils: string[];
}

/*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+**/

/* Portal Interfaces */

export interface PortalInterface {
  currRoute: string;
}

export interface PortalCircleProps {
  mode: AnimationKeys | AnimationKeys[];
}

export interface PortalNavigationProps {}
/*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+*+**/
