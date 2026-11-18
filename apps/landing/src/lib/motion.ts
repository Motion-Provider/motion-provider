import { createMotionRegistry } from "motion-provider";
import data from "@/constants/motion.data";

export const { getAnimation } = createMotionRegistry(data);
