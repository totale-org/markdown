import { describe, test, expect, vi } from "vitest";
import { TotaleMarkdown } from "../src";
import * as elements from "../src/elements";

describe("config", () => {
  test("default config", () => {
    const md = new TotaleMarkdown();
    expect(md.config).toEqual(TotaleMarkdown.DEFAULT_CONFIG);
  });

  test("constructor", () => {
    const md = new TotaleMarkdown({
      elements: {
        heading: {
          includeNewLine: false,
        },
      },
    });
    expect(md.config).toEqual({
      ...TotaleMarkdown.DEFAULT_CONFIG,
      elements: {
        ...TotaleMarkdown.DEFAULT_CONFIG.elements,
        heading: {
          ...TotaleMarkdown.DEFAULT_CONFIG.elements.heading,
          includeNewLine: false,
        },
      },
    });
  });

  test("set config", () => {
    const md = new TotaleMarkdown();
    md.configure({
      elements: {
        ul: {
          includeNewLine: false,
          indentIncrement: 4,
        },
      },
    });
    expect(md.config).toEqual({
      ...TotaleMarkdown.DEFAULT_CONFIG,
      elements: {
        ...TotaleMarkdown.DEFAULT_CONFIG.elements,
        ul: {
          ...TotaleMarkdown.DEFAULT_CONFIG.elements.ul,
          includeNewLine: false,
          indentIncrement: 4,
        },
      },
    });
  });
});

describe("heading", () => {
  test("no config", () => {
    const spy = vi.spyOn(elements, "heading");

    const md = new TotaleMarkdown();

    // No config arguments --> use defaults
    md.heading({
      text: "",
      level: 1,
    });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      text: "",
      level: 1,
      includeNewLine: true, // Default newline
    });

    // All config arguments --> override defaults
    md.heading({
      text: "",
      level: 1,
      includeNewLine: false,
    });
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith({
      text: "",
      level: 1,
      includeNewLine: false,
    });
  });

  test("config", () => {
    const spy = vi.spyOn(elements, "heading");

    const md = new TotaleMarkdown({
      elements: {
        heading: {
          includeNewLine: false,
        },
      },
    });

    // No config arguments --> use config
    md.heading({
      text: "",
      level: 1,
    });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      text: "",
      level: 1,
      includeNewLine: false,
    });

    // All config arguments --> override config
    md.heading({
      text: "",
      level: 2,
      includeNewLine: true,
    });
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith({
      text: "",
      level: 2,
      includeNewLine: true,
    });
  });
});

describe("link", () => {
  test("no config", () => {
    const spy = vi.spyOn(elements, "link");

    const md = new TotaleMarkdown();

    md.link({
      text: "",
      url: "",
    });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      text: "",
      url: "",
    });
  });
});

describe("ul", () => {
  test("no config", () => {
    const spy = vi.spyOn(elements, "ul");

    const md = new TotaleMarkdown();

    // No config arguments --> use defaults
    md.ul({
      items: [],
    });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      items: [],
      includeNewLine: true, // Default newline
      indent: 0, // Default indent
      indentIncrement: 2, // Default indent increment
    });

    // Some config arguments --> use defaults and override some
    md.ul({
      items: [],
      indent: 4,
    });
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith({
      items: [],
      includeNewLine: true, // Default newline
      indent: 4,
      indentIncrement: 2, // Default indent increment
    });

    // All config arguments --> override defaults
    md.ul({
      items: [],
      includeNewLine: false,
      indent: 4,
      indentIncrement: 3,
    });
    expect(spy).toHaveBeenCalledTimes(3);
    expect(spy).toHaveBeenCalledWith({
      items: [],
      includeNewLine: false,
      indent: 4,
      indentIncrement: 3,
    });
  });

  test("config", () => {
    const spy = vi.spyOn(elements, "ul");

    const md = new TotaleMarkdown({
      elements: {
        ul: {
          includeNewLine: false,
          indent: 4,
          indentIncrement: 3,
        },
      },
    });

    // No config arguments --> use config
    md.ul({
      items: [],
    });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      items: [],
      includeNewLine: false,
      indent: 4,
      indentIncrement: 3,
    });

    // Some config arguments --> use config and override some
    md.ul({
      items: [],
      includeNewLine: true,
    });
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith({
      items: [],
      includeNewLine: true,
      indent: 4,
      indentIncrement: 3,
    });

    // All config arguments --> override config
    md.ul({
      items: [],
      includeNewLine: true,
      indent: 2,
      indentIncrement: 1,
    });
    expect(spy).toHaveBeenCalledTimes(3);
    expect(spy).toHaveBeenCalledWith({
      items: [],
      includeNewLine: true,
      indent: 2,
      indentIncrement: 1,
    });
  });
});
