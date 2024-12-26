import { Arrays } from "@totale/utils";

////////////////////////////////
//    Include New Line HOC    //
////////////////////////////////
interface IncludeNewLineOptions {
  /** Whether to include a newline character at the end of the result. Default is `false`. */
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
) => {
  return (options: T) => {
    const includeNewLine = options.includeNewLine ?? false;
    return fn(options) + (includeNewLine ? "\n" : "");
  };
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

export const heading = includeNewLineHOC(_heading);

////////////////////////////////
//            Link            //
////////////////////////////////
export interface LinkOptions extends IncludeNewLineOptions {
  /** The text of the link. */
  text: string;
  /** The URL of the link. */
  url: string;
}

export const _link = (options: LinkOptions): string => {
  return `[${options.text}](${options.url})`;
};

export const link = includeNewLineHOC(_link);

////////////////////////////////
//       Unordered List       //
////////////////////////////////
export interface UnorderedListOptions extends IncludeNewLineOptions {
  /** The items of the unordered list. Recursive arrays are supported for nested lists. */
  items: Arrays.RecursiveArray<string>;
  /** The indentation level of the list. Default is `0`. */
  indent?: number;
  /** The increment of the indentation level. Default is `2`. */
  indentIncrement?: number;
}

export const _ul = (options: UnorderedListOptions): string => {
  const indent = options.indent ?? 0;
  const indentIncrement = options.indentIncrement ?? 2;

  return options.items
    .map((item) => {
      if (Array.isArray(item)) {
        return ul({
          items: item,
          indent: indent + indentIncrement,
          includeNewLine: false,
        });
      }
      return `${" ".repeat(indent)}- ${item}`;
    })
    .join("\n");
};

export const ul = includeNewLineHOC(_ul);
