import type { ThemeRegistration } from "@shikijs/core";

const c = {
  plain: "#000001",
  bg: "#000002",
  comment: "#000003",
  punctuation: "#000004",
  keyword: "#000005",
  string: "#000006",
  fn: "#000007",
  type: "#000008",
  constant: "#000009",
  attr: "#00000a",
  regex: "#00000b",
} as const;

const theme = {
  name: "circle-theme",
  type: "dark",
  fg: c.plain,
  bg: c.bg,
  colorReplacements: {
    [c.plain]: "var(--syntax-plain)",
    [c.bg]: "var(--syntax-bg)",
    [c.comment]: "var(--syntax-comment)",
    [c.punctuation]: "var(--syntax-punctuation)",
    [c.keyword]: "var(--syntax-keyword)",
    [c.string]: "var(--syntax-string)",
    [c.fn]: "var(--syntax-function)",
    [c.type]: "var(--syntax-type)",
    [c.constant]: "var(--syntax-constant)",
    [c.attr]: "var(--syntax-attr)",
    [c.regex]: "var(--syntax-regex)",
  },
  tokenColors: [
    {
      scope: ["variable", "meta.object-literal.key", "variable.other.property"],
      settings: { foreground: c.plain },
    },
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: { foreground: c.comment, fontStyle: "italic" },
    },
    {
      scope: [
        "punctuation.separator",
        "punctuation.terminator",
        "punctuation.accessor",
        "punctuation.section",
        "punctuation.definition.block",
        "punctuation.definition.parameters",
        "punctuation.definition.typeparameters",
        "punctuation.definition.binding-pattern",
        "punctuation.definition.tag",
        "punctuation.definition.template-expression",
        "punctuation.definition.string.template",
        "meta.brace",
        "keyword.operator",
        "storage.type.function.arrow",
      ],
      settings: { foreground: c.punctuation },
    },
    {
      scope: [
        "keyword",
        "keyword.control",
        "keyword.operator.new",
        "keyword.operator.expression",
        "storage.type",
        "storage.modifier",
        "entity.name.tag",
        "variable.language",
        "constant.language.null",
        "constant.language.undefined",
      ],
      settings: { foreground: c.keyword },
    },
    {
      scope: ["string", "string.quoted", "string.template"],
      settings: { foreground: c.string },
    },
    {
      scope: ["entity.name.function", "support.function"],
      settings: { foreground: c.fn },
    },
    {
      scope: [
        "entity.name.type",
        "entity.name.class",
        "entity.name.namespace",
        "entity.other.inherited-class",
        "support.class",
        "support.class.component",
        "support.type",
      ],
      settings: { foreground: c.type },
    },
    {
      scope: ["constant.numeric", "constant.language", "support.constant"],
      settings: { foreground: c.constant },
    },
    {
      scope: [
        "entity.other.attribute-name",
        "punctuation.decorator",
        "meta.decorator entity.name.function",
      ],
      settings: { foreground: c.attr },
    },
    {
      scope: ["string.regexp"],
      settings: { foreground: c.regex },
    },
  ],
} satisfies ThemeRegistration;

export default theme;
