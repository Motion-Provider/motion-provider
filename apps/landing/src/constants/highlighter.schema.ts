import type { PrismTheme } from "prism-react-renderer";

export default {
  plain: {
    color: "var(--syntax-plain)",
    backgroundColor: "var(--syntax-bg)",
    cursor: "plain",
  },
  styles: [
    {
      types: ["comment", "prolog", "doctype", "cdata"],
      style: { color: "var(--syntax-comment)", fontStyle: "italic" },
    },
    {
      types: [
        "punctuation",
        "operator",
        "arrow",
        "spread",
        "interpolation-punctuation",
        "template-punctuation",
      ],
      style: { color: "var(--syntax-punctuation)" },
    },
    {
      types: [
        "keyword",
        "imports",
        "exports",
        "module",
        "control-flow",
        "tag",
        "deleted",
      ],
      style: { color: "var(--syntax-keyword)" },
    },
    {
      types: [
        "string",
        "char",
        "template-string",
        "attr-value",
        "url",
        "inserted",
      ],
      style: { color: "var(--syntax-string)" },
    },
    {
      types: ["function", "generic-function", "method"],
      style: { color: "var(--syntax-function)" },
    },
    {
      types: [
        "class-name",
        "maybe-class-name",
        "known-class-name",
        "builtin",
        "namespace",
        "type-args",
      ],
      style: { color: "var(--syntax-type)" },
    },
    {
      types: ["number", "boolean", "constant", "symbol"],
      style: { color: "var(--syntax-constant)" },
    },
    {
      types: ["attr-name", "decorator", "annotation"],
      style: { color: "var(--syntax-attr)" },
    },
    {
      types: ["regex", "important"],
      style: { color: "var(--syntax-regex)" },
    },
    {
      types: [
        "parameter",
        "variable",
        "property",
        "property-access",
        "literal-property",
        "plain-text",
        "interpolation",
      ],
      style: { color: "var(--syntax-plain)" },
    },
    {
      types: ["important", "bold"],
      style: { fontWeight: "700" },
    },
    {
      types: ["italic"],
      style: { fontStyle: "italic" },
    },
  ],
} as const satisfies PrismTheme;
