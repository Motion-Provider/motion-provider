import { GetSplittedTextOutputProps, GetSplittedTextProps } from "../types";
import getErrorLogs from "./getErrorLogs";

export default function getSplittedText(
  props: GetSplittedTextProps
): GetSplittedTextOutputProps {
  const str = [] as string[];
  const { text, mode = "chars" } = props;

  if (!text || typeof text !== "string") {
    getErrorLogs({
      src: "getSplittedText",
      mod: "error",
      msg: "No text or text is not a string provided, returned an empty array.",
    });
    return [];
  } else if (mode === "words" && !text.includes(" ")) {
    getErrorLogs({
      src: "getSplittedText",
      mod: "error",
      msg: "Mode selected as chars but text does not contain spaces, returned an empty array",
    });
    return [];
  } else {
    if (text.includes(" ")) {
      const words = text.split(/\s+/);

      words.forEach((word) => {
        str.push(word, " ");
      });

      return mode === "words" ? str.slice(0, -1) : str.join("").split("");
    } else {
      return text.split("");
    }
  }
}
