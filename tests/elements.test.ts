import { test, expect, describe } from "vitest";
import { heading, link, ul } from "../src/elements";

describe("heading", () => {
  test("renders a level 1 heading with newline", () => {
    const result = heading({ text: "Title", level: 1 });
    expect(result).toBe("# Title\n");
  });

  test("renders a level 2 heading without newline", () => {
    const result = heading({
      text: "Subtitle",
      level: 2,
      includeNewLine: false,
    });
    expect(result).toBe("## Subtitle");
  });
});

describe("link", () => {
  test("renders a link with newline", () => {
    const result = link({ text: "GitHub", url: "https://github.com" });
    expect(result).toBe("[GitHub](https://github.com)\n");
  });

  test("renders a link without newline", () => {
    const result = link({
      text: "GitHub",
      url: "https://github.com",
      includeNewLine: false,
    });
    expect(result).toBe("[GitHub](https://github.com)");
  });
});

describe("ul", () => {
  test("renders a simple ul with newline", () => {
    const result = ul({ items: ["Item 1", "Item 2"] });
    expect(result).toBe("- Item 1\n- Item 2\n");
  });

  test("renders a nested ul without newline", () => {
    const result = ul({
      items: ["Item 1", ["Subitem 1.1", "Subitem 1.2"], "Item 2"],
      includeNewLine: false,
    });
    expect(result).toBe("- Item 1\n  - Subitem 1.1\n  - Subitem 1.2\n- Item 2");
  });

  test("renders a nested ul with custom indentation and newline", () => {
    const result = ul({
      items: ["Item 1", ["Subitem 1.1", "Subitem 1.2"], "Item 2"],
      indent: 2,
      indentIncrement: 4,
    });
    expect(result).toBe(
      "  - Item 1\n      - Subitem 1.1\n      - Subitem 1.2\n  - Item 2\n",
    );
  });

  test("renders a deeply nested ul without newline", () => {
    const result = ul({
      items: ["Item 1", ["Subitem 1.1", ["Subsubitem 1.1.1"]]],
      includeNewLine: false,
    });
    expect(result).toBe("- Item 1\n  - Subitem 1.1\n    - Subsubitem 1.1.1");
  });
});
