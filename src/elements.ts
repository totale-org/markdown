import { Align, getMarkdownTable } from "markdown-table-ts";
import { Strings, type Arrays } from "@totale/utils";
import { TotaleMarkdown } from "./index.js";

////////////////////////////////
//    Include New Line HOC    //
////////////////////////////////
interface IncludeNewLineOptions {
  /**
   * Whether to include a newline character at the end of the result.
   *
   * Default is based on the config if using within the `TotaleMarkdown` class or based on `DEFAULT_CONFIG` otherwise.
   */
  includeNewLine?: boolean;
}

/**
 * Higher-order function that adds an optional newline character to the result of the provided function.
 *
 * @param fn - The function to be wrapped, which takes an options object and returns a string.
 * @returns A new function that takes an options object, calls the provided function with it,
 *          and appends a newline character to the result if `includeNewLine` is true in the options.
 */
const includeNewLineHOC = <T extends IncludeNewLineOptions>(
  fn: (options: T) => string,
  defaultInclude: boolean,
) => {
  return (options: T) =>
    fn(options) + ((options.includeNewLine ?? defaultInclude) ? "\n" : "");
};

////////////////////////////////
//          Details           //
////////////////////////////////
export interface DetailsOptions extends IncludeNewLineOptions {
  /** The summary of the details. */
  summary: string;
  /** The content of the details. */
  content: string;
}

const _details = (options: DetailsOptions): string => {
  return `<details>\n<summary>\n\n${options.summary}\n</summary>\n\n${options.content}\n</details>`;
};

export const details = includeNewLineHOC(
  _details,
  TotaleMarkdown.DEFAULT_CONFIG.elements.details.includeNewLine,
);

////////////////////////////////
//            Font            //
////////////////////////////////
export interface FontOptions {
  /** The text of the font. */
  text: string;
  /** The color of the font. */
  color?: string;
}

export const font = (options: FontOptions): string => {
  if (Strings.isString(options.color)) {
    return `<font color="${options.color}">${options.text}</font>`;
  }
  return `<font>${options.text}</font>`;
};

////////////////////////////////
//          Heading           //
////////////////////////////////
export interface HeadingOptions extends IncludeNewLineOptions {
  /** The text of the heading. */
  text: string;
  /** The level of the heading. */
  level: number;
}

const _heading = (options: HeadingOptions): string => {
  return `${"#".repeat(options.level)} ${options.text}`;
};

export const heading = includeNewLineHOC(
  _heading,
  TotaleMarkdown.DEFAULT_CONFIG.elements.heading.includeNewLine,
);

////////////////////////////////
//            Link            //
////////////////////////////////
export interface LinkOptions {
  /** The text of the link. */
  text: string;
  /** The URL of the link. */
  url: string;
}

export const link = (options: LinkOptions): string => {
  return `[${options.text}](${encodeURI(options.url)})`;
};

////////////////////////////////
//           Table            //
////////////////////////////////
export interface TableOptions extends IncludeNewLineOptions {
  /** The headers of the table. */
  headers: string[];
  /** The rows of the table. */
  rows: string[][];
  /** The alignment of the columns of the table. */
  alignment: ("left" | "center" | "right" | "none")[];
  /**
   * Whether to pad the columns of the table. If true, the columns will be padded with spaces to align the text.
   *
   * Default is based on the config if using within the `TotaleMarkdown` class or based on `DEFAULT_CONFIG` otherwise.
   */
  padColumns?: boolean;
}

const _table = (options: TableOptions): string => {
  const alignColumns =
    options.padColumns ??
    TotaleMarkdown.DEFAULT_CONFIG.elements.table.padColumns;

  return getMarkdownTable({
    table: {
      head: options.headers,
      body: options.rows,
    },
    alignment: options.alignment as Align[],
    alignColumns,
  });
};

export const table = includeNewLineHOC(
  _table,
  TotaleMarkdown.DEFAULT_CONFIG.elements.table.includeNewLine,
);

////////////////////////////////
//       Unordered List       //
////////////////////////////////
export interface UnorderedListOptions extends IncludeNewLineOptions {
  /** The items of the unordered list. Recursive arrays are supported for nested lists. */
  items: Arrays.RecursiveArray<string>;
  /**
   * The indentation level of the list.
   *
   * Default is based on the config if using within the `TotaleMarkdown` class or based on `DEFAULT_CONFIG` otherwise.
   */
  indent?: number;
  /**
   * The amount to increment the indentation level for nested lists.
   *
   * Default is based on the config if using within the `TotaleMarkdown` class or based on `DEFAULT_CONFIG` otherwise.
   */
  indentIncrement?: number;
}

const _ul = (options: UnorderedListOptions): string => {
  const indent =
    options.indent ?? TotaleMarkdown.DEFAULT_CONFIG.elements.ul.indent;
  const indentIncrement =
    options.indentIncrement ??
    TotaleMarkdown.DEFAULT_CONFIG.elements.ul.indentIncrement;

  return options.items
    .map((item) => {
      if (Array.isArray(item)) {
        return ul({
          items: item,
          indent: indent + indentIncrement,
          indentIncrement,
          includeNewLine: false,
        });
      }
      return `${" ".repeat(indent)}- ${item}`;
    })
    .join("\n");
};

export const ul = includeNewLineHOC(
  _ul,
  TotaleMarkdown.DEFAULT_CONFIG.elements.ul.includeNewLine,
);
