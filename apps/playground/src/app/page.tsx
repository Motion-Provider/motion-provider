import {
  STARTER,
  templateHtml,
  templateProject,
} from "../constants/templates.data";
import { readMarkup } from "../lib/markup";
import { Playground } from "../sections/playground";

export const revalidate = 3600;

export default function Home() {
  const markup = readMarkup(templateHtml(STARTER));
  return (
    <Playground
      initialMarkup={markup}
      starter={templateProject(STARTER, markup)}
    />
  );
}
