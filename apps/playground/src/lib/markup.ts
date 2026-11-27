import { parseFragment, type DefaultTreeAdapterTypes as Tree } from "parse5";
import styleToJS from "style-to-js";
import type {
  Attribute,
  ElementNode,
  Layer,
  Markup,
  MarkupNode,
} from "../types/playground";
import { isElement } from "./motion";

export const MAX_HTML = 80_000;
const MAX_ELEMENTS = 600;
const MAX_DEPTH = 40;

const allowedTags = new Set(
  "a abbr address article aside audio b bdi bdo blockquote br button caption cite code col colgroup data dd del details dfn dialog div dl dt em fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 header hgroup hr i img input ins kbd label legend li main mark menu meter nav ol optgroup option p picture pre progress q rp rt ruby s samp section select small source span strong sub summary sup table tbody td textarea tfoot th thead time tr track u ul var video wbr svg circle ellipse g line path polygon polyline rect title defs linearGradient radialGradient stop".split(
    " ",
  ),
);
const blockedContainers = new Set([
  "script",
  "iframe",
  "object",
  "embed",
  "template",
  "noscript",
  "foreignObject",
]);
const textTags = new Set("h1 h2 h3 h4 h5 h6 p span".split(" "));
const listTags = new Set(["ul", "ol", "menu"]);
const chainChildTags = new Set([
  "li",
  "div",
  "article",
  "section",
  "span",
  "button",
  "a",
  "figure",
]);
const svgTags = new Set(
  "svg circle ellipse g line path polygon polyline rect title defs linearGradient radialGradient stop".split(
    " ",
  ),
);
const booleanAttrs = new Set(
  "autofocus autoplay checked controls disabled hidden loop multiple muted open readonly required reversed selected".split(
    " ",
  ),
);
const numberAttrs = new Set([
  "tabindex",
  "colspan",
  "rowspan",
  "maxlength",
  "minlength",
  "rows",
  "cols",
  "size",
  "start",
  "span",
]);
const names: Record<string, string> = {
  class: "className",
  for: "htmlFor",
  contenteditable: "contentEditable",
  tabindex: "tabIndex",
  readonly: "readOnly",
  autofocus: "autoFocus",
  autocomplete: "autoComplete",
  autoplay: "autoPlay",
  srcset: "srcSet",
  colspan: "colSpan",
  rowspan: "rowSpan",
  datetime: "dateTime",
  crossorigin: "crossOrigin",
  referrerpolicy: "referrerPolicy",
  fetchpriority: "fetchPriority",
  maxlength: "maxLength",
  minlength: "minLength",
  acceptcharset: "acceptCharset",
  cellpadding: "cellPadding",
  cellspacing: "cellSpacing",
  playsinline: "playsInline",
  srcdoc: "srcDoc",
  usemap: "useMap",
  inputmode: "inputMode",
};
const ignoredAttrs = new Set([
  "is",
  "key",
  "ref",
  "children",
  "dangerouslysetinnerhtml",
  "nonce",
  "srcdoc",
  "action",
  "formaction",
  "ping",
  "autofocus",
  "autoplay",
]);
const svgAttrs = new Set(
  "stroke-width stroke-linecap stroke-linejoin stroke-dasharray stroke-dashoffset fill-rule clip-rule fill-opacity stroke-opacity text-anchor stop-color stop-opacity".split(
    " ",
  ),
);

function safeUrl(value: string, image: boolean) {
  const normalized = value.replace(/[\u0000-\u0020\u007f]/g, "");
  const scheme = /^[a-z][a-z\d+.-]*:/i.exec(normalized)?.[0].toLowerCase();

  if (!scheme) return true;
  if (scheme === "https:" || scheme === "http:") return true;
  if (image)
    return /^data:image\/(png|jpeg|webp|gif|avif|svg\+xml)[;,]/i.test(
      normalized,
    );
  return scheme === "mailto:" || scheme === "tel:";
}

function safeSrcSet(value: string) {
  return value
    .split(",")
    .every((candidate) =>
      safeUrl(candidate.trim().split(/\s+/)[0] ?? "", true),
    );
}

function classify(node: ElementNode): {
  kind: Layer["kind"];
  itemCount: number;
} {
  const children = node.children.filter(isElement);
  const text = node.children
    .filter((child) => typeof child === "string")
    .join("");

  if (node.tag === "img" && node.attributes.src)
    return { kind: "MotionImage", itemCount: 1 };

  const repeated =
    children.length >= 2 &&
    !text.trim() &&
    children.every(
      (child) =>
        child.tag === children[0]?.tag && chainChildTags.has(child.tag),
    );

  if (
    repeated ||
    (listTags.has(node.tag) &&
      children.length &&
      children.every((child) => child.tag === "li") &&
      !text.trim())
  ) {
    return { kind: "MotionChain", itemCount: children.length };
  }

  if (
    textTags.has(node.tag) &&
    children.length === 0 &&
    text.trim() &&
    text.length <= 600
  ) {
    return { kind: "MotionText", itemCount: text.trim().split(/\s+/u).length };
  }

  return { kind: "MotionContainer", itemCount: 1 };
}

function layerName(node: ElementNode) {
  if (typeof node.attributes["data-motion-name"] === "string")
    return node.attributes["data-motion-name"];
  if (typeof node.attributes.id === "string") return node.attributes.id;
  if (
    node.tag === "img" &&
    typeof node.attributes.alt === "string" &&
    node.attributes.alt
  )
    return node.attributes.alt;
  if (textTags.has(node.tag) || ["button", "a", "li"].includes(node.tag))
    return (
      node.children
        .filter((child) => typeof child === "string")
        .join("")
        .trim() || node.tag
    );

  return (
    (
      {
        section: "Section",
        ul: "List",
        ol: "List",
        li: "List item",
        img: "Image",
        button: "Button",
        a: "Link",
      } as Record<string, string>
    )[node.tag] ?? node.tag
  );
}

export function readMarkup(html: string): Markup {
  if (html.length > MAX_HTML)
    throw new Error("HTML is limited to 80,000 characters.");

  const styles: string[] = [];
  const classes = new Set<string>();
  let omitted = 0;
  let count = 0;

  function convert(
    children: Tree.ChildNode[],
    path: string,
    depth: number,
  ): MarkupNode[] {
    if (depth > MAX_DEPTH)
      throw new Error("HTML is nested more than 40 levels deep.");

    return children.flatMap<MarkupNode>((entry, index) => {
      const id = path ? `${path}.${index}` : String(index);
      if (entry.nodeName === "#text" && "value" in entry) return [entry.value];
      if (!("tagName" in entry)) return [];

      const tag = entry.tagName;
      if (tag === "style") {
        styles.push(
          entry.childNodes
            .map((child) => ("value" in child ? child.value : ""))
            .join(""),
        );
        return [];
      }

      if (blockedContainers.has(tag)) {
        omitted += 1;
        return [];
      }

      if (!allowedTags.has(tag)) {
        omitted += 1;
        return convert(entry.childNodes, id, depth + 1);
      }

      count += 1;
      if (count > MAX_ELEMENTS)
        throw new Error("This preview supports up to 600 HTML elements.");

      const attributes: Record<string, Attribute> = {};
      let style: Record<string, string> = {};
      for (const { name, value } of entry.attrs) {
        if (
          ignoredAttrs.has(name) ||
          name.startsWith("on") ||
          name === "__proto__" ||
          name === "constructor"
        ) {
          omitted += 1;
          continue;
        }

        if (
          ((name === "href" || name === "src" || name === "poster") &&
            !safeUrl(value, name !== "href")) ||
          (name === "srcset" && !safeSrcSet(value))
        ) {
          omitted += 1;
          continue;
        }

        if (name === "style") {
          try {
            style = styleToJS(value, { reactCompat: true });
          } catch {
            omitted += 1;
          }
          continue;
        }

        const key = Object.hasOwn(names, name)
          ? names[name]!
          : svgTags.has(tag) && svgAttrs.has(name)
            ? name.replace(/-([a-z])/g, (_, letter: string) =>
                letter.toUpperCase(),
              )
            : name;
        if (booleanAttrs.has(name)) attributes[key] = true;
        else if (numberAttrs.has(name) && /^-?\d+$/.test(value.trim()))
          attributes[key] = Number(value);
        else attributes[key] = value;
      }

      if (typeof attributes.className === "string") {
        for (const className of attributes.className.split(/\s+/u))
          if (className) classes.add(className);
      }

      return [
        {
          id,
          tag,
          attributes,
          style,
          children: convert(entry.childNodes, id, depth + 1),
        },
      ];
    });
  }

  const nodes = convert(parseFragment(html).childNodes, "", 0);
  const layers: Layer[] = [];

  function collect(children: MarkupNode[], depth: number) {
    for (const node of children) {
      if (!isElement(node)) continue;
      if (!svgTags.has(node.tag) || node.tag === "svg") {
        const { kind, itemCount } = classify(node);
        layers.push({
          id: node.id,
          tag: node.tag,
          name: layerName(node),
          kind,
          depth,
          itemCount,
        });

        if (!svgTags.has(node.tag)) collect(node.children, depth + 1);
      }
    }
  }

  collect(nodes, 0);
  return { nodes, layers, styles, classes: [...classes].sort(), omitted };
}
