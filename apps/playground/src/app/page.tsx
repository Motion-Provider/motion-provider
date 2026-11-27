import {
  STARTER,
  templateHtml,
  templateProject,
} from "../constants/templates.data";
import { Playground } from "../features/playground";
import { readMarkup } from "../lib/markup";

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
