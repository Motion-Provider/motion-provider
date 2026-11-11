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
  bracket: "#00000c",
  operator: "#00000d",
  ternary: "#00000e",
  number: "#00000f",
  tag: "#000010",
  component: "#000011",
  key: "#000012",
  escape: "#000013",
  inserted: "#000014",
  deleted: "#000015",
} as const;

const theme = {
  name: "syntax-theme",
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
    [c.bracket]: "var(--syntax-bracket)",
    [c.operator]: "var(--syntax-operator)",
    [c.ternary]: "var(--syntax-ternary)",
    [c.number]: "var(--syntax-number)",
    [c.tag]: "var(--syntax-tag)",
    [c.component]: "var(--syntax-component)",
    [c.key]: "var(--syntax-key)",
    [c.escape]: "var(--syntax-escape)",
    [c.inserted]: "var(--syntax-inserted)",
    [c.deleted]: "var(--syntax-deleted)",
  },
  tokenColors: [
    // ── Identifiers
    {
      scope: [
        "variable",
        "variable.parameter",
        "variable.other.property",
        "variable.other.object.property",
        "variable.object.property",
        "support.variable",
        "support.constant.math",
        "support.constant.json",
        "support.type.object",
        "meta.jsx.children",
      ],
      settings: { foreground: c.plain },
    },

    // ── Object literal keys: { once: false }
    {
      scope: ["meta.object-literal.key", "support.type.property-name"],
      settings: { foreground: c.key },
    },

    // ── Comments & JSDoc
    {
      scope: [
        "comment",
        "punctuation.definition.comment",
        "punctuation.definition.block.tags.jsdoc",
        "entity.name.type.instance.jsdoc",
        "variable.other.jsdoc",
        "storage.type.class.jsdoc",
      ],
      settings: { foreground: c.comment, fontStyle: "italic" },
    },

    // ── Punctuation: , ; . : ... ?: | `
    {
      scope: [
        "punctuation.separator",
        "punctuation.terminator",
        "punctuation.accessor",
        "punctuation.section",
        "punctuation.definition.tag",
        "punctuation.definition.template-expression",
        "punctuation.definition.string.template",
        "meta.brace",
        "keyword.operator.type",
        "keyword.operator.type.annotation",
        "keyword.operator.optional",
        "keyword.operator.definiteassignment",
        "keyword.operator.spread",
        "keyword.operator.rest",
        "keyword.operator.quantifier.regexp",
      ],
      settings: { foreground: c.punctuation },
    },

    // ── Brackets: (), [], {}, <T>, destructuring, `${ }`
    {
      scope: [
        "meta.brace.round",
        "meta.brace.square",
        "punctuation.definition.block",
        "punctuation.definition.parameters",
        "punctuation.definition.typeparameters",
        "punctuation.definition.binding-pattern",
        "punctuation.section.embedded",
      ],
      settings: { foreground: c.bracket },
    },

    // ── Operators: = === || + ! ?? =>
    {
      scope: ["keyword.operator", "storage.type.function.arrow"],
      settings: { foreground: c.operator },
    },

    // ── Ternary: ? :
    {
      scope: ["keyword.operator.ternary"],
      settings: { foreground: c.ternary },
    },

    // ── Keywords
    {
      scope: [
        "keyword",
        "keyword.control",
        "keyword.operator.new",
        "keyword.operator.expression",
        "storage.type",
        "storage.modifier",
        "variable.language",
        "constant.language.null",
        "constant.language.undefined",
      ],
      settings: { foreground: c.keyword },
    },

    // ── Strings & string-like values
    {
      scope: [
        "string",
        "string.quoted",
        "string.template",
        "support.constant.property-value",
        "support.constant.font-name",
        "constant.other.color",
      ],
      settings: { foreground: c.string },
    },

    // ── Functions & calls
    {
      scope: ["entity.name.function", "support.function"],
      settings: { foreground: c.fn },
    },

    // ── Types, classes, generics
    {
      scope: [
        "entity.name.type",
        "entity.name.type.module",
        "entity.name.class",
        "entity.name.namespace",
        "entity.other.inherited-class",
        "support.class",
        "support.type",
      ],
      settings: { foreground: c.type },
    },

    // ── Numbers & CSS units
    {
      scope: ["constant.numeric", "keyword.other.unit"],
      settings: { foreground: c.number },
    },

    // ── Constants, primitive types, enum members
    {
      scope: [
        "constant.language",
        "support.constant",
        "support.type.primitive",
        "support.type.builtin",
        "variable.other.enummember",
      ],
      settings: { foreground: c.constant },
    },

    // ── JSX / HTML tags
    {
      scope: ["entity.name.tag"],
      settings: { foreground: c.tag },
    },
    {
      scope: ["support.class.component"],
      settings: { foreground: c.component },
    },

    // ── Attributes & decorators
    {
      scope: [
        "entity.other.attribute-name",
        "punctuation.decorator",
        "meta.decorator entity.name.function",
      ],
      settings: { foreground: c.attr },
    },

    // ── Regex body & flags
    {
      scope: ["string.regexp", "keyword.other.tsx"],
      settings: { foreground: c.regex },
    },

    // ── Escapes & regex tokens: \n \w \d ^ $ ( ) [ ] |
    {
      scope: [
        "constant.character.escape",
        "constant.character.numeric.regexp",
        "constant.other.character-class.regexp",
        "constant.other.character-class.set.regexp",
        "constant.other.character-class.range.regexp",
        "keyword.control.anchor.regexp",
        "keyword.operator.or.regexp",
        "keyword.operator.negation.regexp",
        "keyword.other.back-reference.regexp",
        "punctuation.definition.group.regexp",
        "punctuation.definition.character-class.regexp",
        "support.other.parenthesis.regexp",
      ],
      settings: { foreground: c.escape },
    },

    // ── Diff / invalid
    {
      scope: [
        "markup.inserted",
        "meta.diff.header.to-file",
        "punctuation.definition.inserted",
      ],
      settings: { foreground: c.inserted },
    },
    {
      scope: [
        "markup.deleted",
        "meta.diff.header.from-file",
        "punctuation.definition.deleted",
        "invalid",
        "invalid.illegal",
      ],
      settings: { foreground: c.deleted },
    },
  ],
} satisfies ThemeRegistration;

export default theme;
