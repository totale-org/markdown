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

  test("configure", () => {
    const md = new TotaleMarkdown();
    md.configure({
      elements: {
        ul: {
          indentIncrement: 4,
          includeNewLine: false,
        },
      },
    });
    expect(md.config).toEqual({
      ...TotaleMarkdown.DEFAULT_CONFIG,
      elements: {
        ...TotaleMarkdown.DEFAULT_CONFIG.elements,
        ul: {
          ...TotaleMarkdown.DEFAULT_CONFIG.elements.ul,
          indentIncrement: 4,
          includeNewLine: false,
        },
      },
    });
  });
});

describe("details", () => {
  test("no config", () => {
    const spy = vi.spyOn(elements, "details");
    const md = new TotaleMarkdown();

    // No config arguments --> use defaults
    md.details({
      summary: "",
      content: "",
    });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      summary: "",
      content: "",
      includeNewLine: true, // Default newline
    });

    // All config arguments --> override defaults
    md.details({
      summary: "",
      content: "",
      includeNewLine: false,
    });
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith({
      summary: "",
      content: "",
      includeNewLine: false,
    });
  });

  test("config", () => {
    const spy = vi.spyOn(elements, "details");
    const md = new TotaleMarkdown({
      elements: {
        details: {
          includeNewLine: false,
        },
      },
    });

    // No config arguments --> use config
    md.details({
      summary: "",
      content: "",
    });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      summary: "",
      content: "",
      includeNewLine: false,
    });

    // All config arguments --> override config
    md.details({
      summary: "",
      content: "",
      includeNewLine: true,
    });
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith({
      summary: "",
      content: "",
      includeNewLine: true,
    });
  });
});

describe("font", () => {
  test("no config", () => {
    const spy = vi.spyOn(elements, "font");
    const md = new TotaleMarkdown();

    md.font({
      content: "",
    });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      content: "",
    });
  });
});

describe("githubAlert", () => {
  test("no config", () => {
    const spy = vi.spyOn(elements, "githubAlert");
    const md = new TotaleMarkdown();

    // No config arguments --> use defaults
    md.githubAlert({
      content: "",
      type: "note",
    });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      content: "",
      type: "note",
      includeNewLine: true, // Default newline
    });

    // All config arguments --> override defaults
    md.githubAlert({
      content: "",
      type: "note",
      includeNewLine: false,
    });
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith({
      content: "",
      type: "note",
      includeNewLine: false,
    });
  });

  test("config", () => {
    const spy = vi.spyOn(elements, "githubAlert");
    const md = new TotaleMarkdown({
      elements: {
        githubAlert: {
          includeNewLine: false,
        },
      },
    });

    // No config arguments --> use config
    md.githubAlert({
      content: "",
      type: "note",
    });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      content: "",
      type: "note",
      includeNewLine: false,
    });

    // All config arguments --> override config
    md.githubAlert({
      content: "",
      type: "note",
      includeNewLine: true,
    });
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith({
      content: "",
      type: "note",
      includeNewLine: true,
    });
  });
});

describe("heading", () => {
  test("no config", () => {
    const spy = vi.spyOn(elements, "heading");
    const md = new TotaleMarkdown();

    // No config arguments --> use defaults
    md.heading({
      content: "",
      level: 1,
    });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      content: "",
      level: 1,
      includeNewLine: true, // Default newline
    });

    // All config arguments --> override defaults
    md.heading({
      content: "",
      level: 1,
      includeNewLine: false,
    });
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith({
      content: "",
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
      content: "",
      level: 1,
    });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      content: "",
      level: 1,
      includeNewLine: false,
    });

    // All config arguments --> override config
    md.heading({
      content: "",
      level: 2,
      includeNewLine: true,
    });
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith({
      content: "",
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
      content: "",
      url: "",
    });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      content: "",
      url: "",
    });
  });
});

describe("markdownlintIgnore", () => {
  test("no config", () => {
    const spy = vi.spyOn(elements, "markdownlintIgnore");
    const md = new TotaleMarkdown();

    // No config arguments --> use defaults
    md.markdownlintIgnore({
      content: "",
    });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      content: "",
      includeNewLine: true, // Default newline
    });

    // All config arguments --> override defaults
    md.markdownlintIgnore({
      content: "",
      includeNewLine: false,
    });
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith({
      content: "",
      includeNewLine: false,
    });
  });

  test("config", () => {
    const spy = vi.spyOn(elements, "markdownlintIgnore");
    const md = new TotaleMarkdown({
      elements: {
        markdownlintIgnore: {
          includeNewLine: false,
        },
      },
    });

    // No config arguments --> use config
    md.markdownlintIgnore({
      content: "",
    });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      content: "",
      includeNewLine: false,
    });

    // All config arguments --> override config
    md.markdownlintIgnore({
      content: "",
      includeNewLine: true,
    });
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith({
      content: "",
      includeNewLine: true,
    });
  });
});

describe("prettierIgnore", () => {
  test("no config", () => {
    const spy = vi.spyOn(elements, "prettierIgnore");
    const md = new TotaleMarkdown();

    // No config arguments --> use defaults
    md.prettierIgnore({
      content: "",
    });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      content: "",
      includeNewLine: true, // Default newline
    });

    // All config arguments --> override defaults
    md.prettierIgnore({
      content: "",
      includeNewLine: false,
    });
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith({
      content: "",
      includeNewLine: false,
    });
  });

  test("config", () => {
    const spy = vi.spyOn(elements, "prettierIgnore");
    const md = new TotaleMarkdown({
      elements: {
        prettierIgnore: {
          includeNewLine: false,
        },
      },
    });

    // No config arguments --> use config
    md.prettierIgnore({
      content: "",
    });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      content: "",
      includeNewLine: false,
    });

    // All config arguments --> override config
    md.prettierIgnore({
      content: "",
      includeNewLine: true,
    });
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith({
      content: "",
      includeNewLine: true,
    });
  });
});

describe("table", () => {
  test("no config", () => {
    const spy = vi.spyOn(elements, "table");
    const md = new TotaleMarkdown();

    // No config arguments --> use defaults
    md.table({
      headers: ["Header"],
      rows: [["Row"]],
      alignment: ["left"],
    });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      headers: ["Header"],
      rows: [["Row"]],
      alignment: ["left"],
      padColumns: true, // Default padColumns
      includeNewLine: true, // Default newline
    });

    // Some config arguments --> use defaults and override some
    md.table({
      headers: ["Header"],
      rows: [["Row"]],
      alignment: ["left"],
      padColumns: false,
    });
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith({
      headers: ["Header"],
      rows: [["Row"]],
      alignment: ["left"],
      padColumns: false,
      includeNewLine: true, // Default newline
    });

    // All config arguments --> override defaults
    md.table({
      headers: ["Header"],
      rows: [["Row"]],
      alignment: ["left"],
      padColumns: false,
      includeNewLine: false,
    });
    expect(spy).toHaveBeenCalledTimes(3);
    expect(spy).toHaveBeenCalledWith({
      headers: ["Header"],
      rows: [["Row"]],
      alignment: ["left"],
      padColumns: false,
      includeNewLine: false,
    });
  });

  test("config", () => {
    const spy = vi.spyOn(elements, "table");
    const md = new TotaleMarkdown({
      elements: {
        table: {
          padColumns: false,
          includeNewLine: false,
        },
      },
    });

    // No config arguments --> use config
    md.table({
      headers: ["Header"],
      rows: [["Row"]],
      alignment: ["left"],
    });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith({
      headers: ["Header"],
      rows: [["Row"]],
      alignment: ["left"],
      padColumns: false,
      includeNewLine: false,
    });

    // Some config arguments --> use config and override some
    md.table({
      headers: ["Header"],
      rows: [["Row"]],
      alignment: ["left"],
      padColumns: true,
    });
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith({
      headers: ["Header"],
      rows: [["Row"]],
      alignment: ["left"],
      padColumns: true,
      includeNewLine: false,
    });

    // All config arguments --> override config
    md.table({
      headers: ["Header"],
      rows: [["Row"]],
      alignment: ["left"],
      padColumns: true,
      includeNewLine: true,
    });
    expect(spy).toHaveBeenCalledTimes(3);
    expect(spy).toHaveBeenCalledWith({
      headers: ["Header"],
      rows: [["Row"]],
      alignment: ["left"],
      padColumns: true,
      includeNewLine: true,
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
      indent: 0, // Default indent
      indentIncrement: 2, // Default indent increment
      includeNewLine: true, // Default newline
    });

    // Some config arguments --> use defaults and override some
    md.ul({
      items: [],
      indent: 4,
    });
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith({
      items: [],
      indent: 4,
      indentIncrement: 2, // Default indent increment
      includeNewLine: true, // Default newline
    });

    // All config arguments --> override defaults
    md.ul({
      items: [],
      indent: 4,
      indentIncrement: 3,
      includeNewLine: false,
    });
    expect(spy).toHaveBeenCalledTimes(3);
    expect(spy).toHaveBeenCalledWith({
      items: [],
      indent: 4,
      indentIncrement: 3,
      includeNewLine: false,
    });
  });

  test("config", () => {
    const spy = vi.spyOn(elements, "ul");
    const md = new TotaleMarkdown({
      elements: {
        ul: {
          indent: 4,
          indentIncrement: 3,
          includeNewLine: false,
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
      indent: 4,
      indentIncrement: 3,
      includeNewLine: false,
    });

    // Some config arguments --> use config and override some
    md.ul({
      items: [],
      includeNewLine: true,
    });
    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith({
      items: [],
      indent: 4,
      indentIncrement: 3,
      includeNewLine: true,
    });

    // All config arguments --> override config
    md.ul({
      items: [],
      indent: 2,
      indentIncrement: 1,
      includeNewLine: true,
    });
    expect(spy).toHaveBeenCalledTimes(3);
    expect(spy).toHaveBeenCalledWith({
      items: [],
      indent: 2,
      indentIncrement: 1,
      includeNewLine: true,
    });
  });
});
