import { describe, test, expect } from "vitest";
import { details, heading, link, ul } from "../src";

describe("details", () => {
  test("default newline (true)", () => {
    const result = details({ summary: "Summary", content: "Content" });
    expect(result).toBe(
      "<details>\n<summary>\n\nSummary\n</summary>\n\nContent\n</details>\n",
    );
  });

  test("custom newline (true)", () => {
    const result = details({
      summary: "Summary",
      content: "Content",
      includeNewLine: true,
    });
    expect(result).toBe(
      "<details>\n<summary>\n\nSummary\n</summary>\n\nContent\n</details>\n",
    );
  });

  test("custom newline (false)", () => {
    const result = details({
      summary: "Summary",
      content: "Content",
      includeNewLine: false,
    });
    expect(result).toBe(
      "<details>\n<summary>\n\nSummary\n</summary>\n\nContent\n</details>",
    );
  });
});

describe("heading", () => {
  test("default newline (true)", () => {
    const result = heading({ text: "Heading", level: 1 });
    expect(result).toBe("# Heading\n");

    const result2 = heading({ text: "Heading", level: 2 });
    expect(result2).toBe("## Heading\n");

    const result3 = heading({ text: "Heading", level: 3 });
    expect(result3).toBe("### Heading\n");
  });

  test("custom newline (true)", () => {
    const result = heading({
      text: "Heading",
      level: 1,
      includeNewLine: true,
    });
    expect(result).toBe("# Heading\n");
  });

  test("custom newline (false)", () => {
    const result = heading({
      text: "Heading",
      level: 1,
      includeNewLine: false,
    });
    expect(result).toBe("# Heading");
  });
});

describe("link", () => {
  test("basic", () => {
    const result = link({ text: "Google", url: "https://google.com" });
    expect(result).toBe("[Google](https://google.com)");
  });

  test("URL encoding", () => {
    const result = link({
      text: "Google",
      url: "https://google.com?q=hello world",
    });
    expect(result).toBe("[Google](https://google.com?q=hello%20world)");
  });
});

describe("ul", () => {
  test("default newline (true), default indent (0), default increment (2)", () => {
    const result = ul({
      items: [
        "Item 1",
        "Item 2",
        ["Item 3", "Item 4", ["Item 5", "Item 6"]],
        "Item 7",
        ["Item 8"],
      ],
    });
    expect(result).toBe(
      "- Item 1\n- Item 2\n  - Item 3\n  - Item 4\n    - Item 5\n    - Item 6\n- Item 7\n  - Item 8\n",
    );
  });

  test("custom newline (true)", () => {
    const result = ul({
      items: ["Item 1", "Item 2", "Item 3"],
      includeNewLine: true,
    });
    expect(result).toBe("- Item 1\n- Item 2\n- Item 3\n");

    const result2 = ul({
      items: ["Item 1", "Item 2", "Item 3", ["Item 4", "Item 5"]],
      includeNewLine: true,
    });
    expect(result2).toBe(
      "- Item 1\n- Item 2\n- Item 3\n  - Item 4\n  - Item 5\n",
    );
  });

  test("custom newline (false)", () => {
    const result = ul({
      items: ["Item 1", "Item 2", "Item 3"],
      includeNewLine: false,
    });
    expect(result).toBe("- Item 1\n- Item 2\n- Item 3");

    const result2 = ul({
      items: ["Item 1", "Item 2", "Item 3", ["Item 4", "Item 5"]],
      includeNewLine: false,
    });
    expect(result2).toBe(
      "- Item 1\n- Item 2\n- Item 3\n  - Item 4\n  - Item 5",
    );
  });

  test("custom indent (2)", () => {
    const result = ul({
      items: [
        "Item 1",
        "Item 2",
        ["Item 3", "Item 4", ["Item 5", "Item 6"]],
        "Item 7",
        ["Item 8"],
      ],
      indent: 2,
    });
    expect(result).toBe(
      "  - Item 1\n  - Item 2\n    - Item 3\n    - Item 4\n      - Item 5\n      - Item 6\n  - Item 7\n    - Item 8\n",
    );
  });

  test("custom increment (3)", () => {
    const result = ul({
      items: [
        "Item 1",
        "Item 2",
        ["Item 3", "Item 4", ["Item 5", "Item 6"]],
        "Item 7",
        ["Item 8"],
      ],
      indentIncrement: 3,
    });
    expect(result).toBe(
      "- Item 1\n- Item 2\n   - Item 3\n   - Item 4\n      - Item 5\n      - Item 6\n- Item 7\n   - Item 8\n",
    );
  });

  test("custom indent (2) and increment (3)", () => {
    const result = ul({
      items: [
        "Item 1",
        "Item 2",
        ["Item 3", "Item 4", ["Item 5", "Item 6"]],
        "Item 7",
        ["Item 8"],
      ],
      indent: 2,
      indentIncrement: 3,
    });
    expect(result).toBe(
      "  - Item 1\n  - Item 2\n     - Item 3\n     - Item 4\n        - Item 5\n        - Item 6\n  - Item 7\n     - Item 8\n",
    );
  });
});
