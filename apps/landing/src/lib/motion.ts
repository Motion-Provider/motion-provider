import { createMotionRegistry } from "motion-provider";
import data from "@/constants/motion.data";

export const { getMotionAnimation: getAnimation } = createMotionRegistry(data);
