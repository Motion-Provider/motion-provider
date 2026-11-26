import {
  animationFor,
  chainChild,
  imageStyle,
  isElement,
  nodeProps,
  staggerFor,
  VOID_TAGS,
} from "./motion";
import type {
  ElementNode,
  Markup,
  MarkupNode,
  Project,
} from "../types/playground";

const json = (value: unknown) =>
  JSON.stringify(value)
    .replaceAll("\u2028", "\\u2028")
    .replaceAll("\u2029", "\\u2029");
const indent = (depth: number) => "  ".repeat(depth);

const motionAttributes = new Set([
  "id",
  "className",
  "style",
  "title",
  "role",
  "tabIndex",
  "hidden",
  "lang",
  "dir",
  "alt",
  "wrapperClassName",
]);

function jsxProps(values: Record<string, unknown>, motion = false) {
  const extra: Record<string, unknown> = {};
  const direct = Object.entries(values)
    .map(([name, value]) => {
      if (typeof value === "undefined") return "";
      const validName = /^[a-zA-Z_$][\w$-]*$/.test(name);
      const custom = name.startsWith("data-") || name.startsWith("aria-");
      if (!validName || (motion && !custom && !motionAttributes.has(name))) {
        extra[name] = value;
        return "";
      }
      if (value === true) return ` ${name}`;
      return ` ${name}={${json(value)}}`;
    })
    .join("");
  return direct + (Object.keys(extra).length ? ` {...${json(extra)}}` : "");
}

export function exportComponent(project: Project, markup: Markup, origin = "") {
  const imports = new Set<string>();
  const layers = new Map(markup.layers.map((layer) => [layer.id, layer]));
  const registry: Record<string, unknown> = {};
  let hasStyle = false;
  function attributes(values: Record<string, unknown>, motion = false) {
    const { style, ...rest } = values;
    if (style) hasStyle = true;
    return (
      jsxProps(rest, motion) +
      (style ? ` style={${json(style)} as CSSProperties}` : "")
    );
  }

  function render(node: MarkupNode, depth: number): string {
    const pad = indent(depth);
    if (!isElement(node)) return node.trim() ? `${pad}{${json(node)}}` : "";
    const layer = layers.get(node.id);
    const settings = project.assignments[node.id];
    const props = nodeProps(node);
    if (project.template && origin && props.src === "/motion-orbit.webp")
      props.src = new URL(props.src, origin).href;
    const tag = node.tag;
    if (!layer || !settings)
      return element(tag, attributes(props), node.children, depth);

    const kind = layer.kind;
    imports.add(kind);
    const id = `layer_${node.id.replaceAll(".", "_")}`;
    const config: Record<string, unknown> = {
      animation: animationFor(settings),
    };
    const spread = ` {...motionConfig.${id}.props}`;
    registry[id] = { type: kind, props: config };

    if (kind === "MotionImage") {
      const {
        src,
        className,
        style: _style,
        width: _width,
        height: _height,
        ...rest
      } = props;
      config.config = {
        img: src,
        pieces: settings.pieces,
        ...staggerFor(settings),
        ...(settings.interaction !== "auto"
          ? { fn: settings.interaction }
          : {}),
      };
      return `${pad}<MotionImage${spread}${attributes({ ...rest, wrapperClassName: className, style: imageStyle(node) }, true)} />`;
    }
    if (kind === "MotionText") {
      const { className, ...rest } = props;
      config.elementType = tag;
      config.config = { mode: settings.split, ...staggerFor(settings) };
      return `${pad}<MotionText${spread}${attributes({ ...rest, wrapperClassName: className }, true)}>{${json(node.children.join(""))}}</MotionText>`;
    }
    if (kind === "MotionChain") {
      const children = node.children.filter(isElement);
      const layout = chainChild(
        node,
        children.some((child) => !!project.assignments[child.id]),
        children,
      );
      config.config = staggerFor(settings);
      config.elementType = layout.tag;
      const items = children.map((child) => {
        if (layout.shared) {
          return `${indent(depth + 2)}<>${child.children.map((item) => (typeof item === "string" ? `{${json(item)}}` : `\n${render(item, depth + 3)}\n${indent(depth + 2)}`)).join("")}</>`;
        }
        return render(
          layout.list ? { ...child, tag: "div" } : child,
          depth + 2,
        );
      });
      return `${pad}<${tag}${attributes(props)}>\n${indent(depth + 1)}<MotionChain${spread}${attributes(layout.props, true)}>\n${items.join("\n")}\n${indent(depth + 1)}</MotionChain>\n${pad}</${tag}>`;
    }

    config.elementType = tag;
    const children = VOID_TAGS.has(tag) ? [] : node.children;
    return element(
      "MotionContainer",
      spread + attributes(props, true),
      children,
      depth,
    );
  }

  function element(
    tag: string,
    props: string,
    children: MarkupNode[],
    depth: number,
  ) {
    const pad = indent(depth);
    if (
      VOID_TAGS.has(tag) ||
      (tag === "MotionContainer" && children.length === 0)
    )
      return `${pad}<${tag}${props} />`;
    if (children.every((node) => typeof node === "string")) {
      const content = children.join("");
      return `${pad}<${tag}${props}>${content ? `{${json(content)}}` : ""}</${tag}>`;
    }
    const content = children
      .map((node) =>
        typeof node === "string"
          ? `${indent(depth + 1)}{${json(node)}}`
          : render(node, depth + 1),
      )
      .join("\n");
    return `${pad}<${tag}${props}>\n${content}\n${pad}</${tag}>`;
  }

  const body = markup.nodes.map((node) => render(node, 3)).filter(Boolean);
  if (markup.styles.length)
    body.unshift(`      <style>{${json(markup.styles.join("\n"))}}</style>`);
  const styleImport = hasStyle
    ? 'import type { CSSProperties } from "react";\n'
    : "";
  const header = imports.size
    ? `"use client";\n\n${styleImport}import { createMotionConfig, ${[...imports].sort().join(", ")} } from "motion-provider";\n\nexport const motionConfig = createMotionConfig(${JSON.stringify(registry, null, 2).replace(/"([A-Za-z_]\w*)":/g, "$1:")});\n\n`
    : styleImport && `${styleImport}\n`;
  return `${header}export default function AnimatedComponent() {\n  return (\n    <>\n${body.join("\n")}\n    </>\n  );\n}\n`;
}

export function fileName(project: Project) {
  return (
    (project.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "animated-component") + ".tsx"
  );
}
