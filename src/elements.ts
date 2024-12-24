import { Arrays } from "@totale/utils";

////////////////////////////////
//    Include New Line HOC    //
////////////////////////////////
interface IncludeNewLineOptions {
  includeNewLine?: boolean;
}

const includeNewLineHOC = <T extends IncludeNewLineOptions>(
  fn: (options: T) => string,
) => {
  return (options: T) => {
    const includeNewLine = options.includeNewLine ?? true;
    return fn(options) + (includeNewLine ? "\n" : "");
  };
};

////////////////////////////////
//          Heading           //
////////////////////////////////
export interface HeadingOptions extends IncludeNewLineOptions {
  text: string;
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
  text: string;
  url: string;
}

export const _link = (options: LinkOptions) => {
  return `[${options.text}](${options.url})`;
};

export const link = includeNewLineHOC(_link);

////////////////////////////////
//       Unordered List       //
////////////////////////////////
export interface UnorderedListOptions extends IncludeNewLineOptions {
  items: Arrays.RecursiveArray<string>;
  indent?: number;
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
