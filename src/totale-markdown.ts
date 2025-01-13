import merge from "deepmerge";
import { Nullish, Records } from "@totale/utils";
import {
  details,
  font,
  heading,
  link,
  table,
  ul,
  type DetailsOptions,
  type FontOptions,
  type HeadingOptions,
  type LinkOptions,
  type TableOptions,
  type UnorderedListOptions,
} from "./index.js";

export type FullConfig = {
  elements: {
    details: {
      includeNewLine: boolean;
    };
    heading: {
      includeNewLine: boolean;
    };
    table: {
      padColumns: boolean;
      includeNewLine: boolean;
    };
    ul: {
      indent: number;
      indentIncrement: number;
      includeNewLine: boolean;
    };
  };
};

export type PartialConfig = Records.DeepPartial<FullConfig>;

export class TotaleMarkdown {
  private _config: FullConfig;
  public static readonly DEFAULT_CONFIG: FullConfig = {
    elements: {
      details: {
        includeNewLine: true,
      },
      heading: {
        includeNewLine: true,
      },
      table: {
        padColumns: true,
        includeNewLine: true,
      },
      ul: {
        indent: 0,
        indentIncrement: 2,
        includeNewLine: true,
      },
    },
  };

  constructor(config?: PartialConfig) {
    if (Nullish.isUndefined(config)) {
      this._config = structuredClone(TotaleMarkdown.DEFAULT_CONFIG);
    } else {
      this._config = merge(TotaleMarkdown.DEFAULT_CONFIG, config as FullConfig);
    }
  }

  /**
   * Retrieves a deep clone of the current configuration.
   */
  public get config(): FullConfig {
    return structuredClone(this._config);
  }

  /**
   * Uses a deep merge strategy to combine the provided partial configuration with the current configuration.
   *
   * @example
   * ```typescript
   * const md = new TotaleMarkdown();
   * const newConfig: PartialConfig = { elements: { ul: { indent: 2 } } };
   * md.configure(newConfig);
   * ```
   */
  public configure(config: PartialConfig) {
    this._config = merge(this._config, config as FullConfig);
  }

  public details(options: DetailsOptions): string {
    return details({
      includeNewLine: this._config.elements.details.includeNewLine,
      ...options,
    });
  }

  public font(options: FontOptions): string {
    return font({
      ...options,
    });
  }

  public heading(options: HeadingOptions): string {
    return heading({
      includeNewLine: this._config.elements.heading.includeNewLine,
      ...options,
    });
  }

  public link(options: LinkOptions): string {
    return link({
      ...options,
    });
  }

  public table(options: TableOptions): string {
    return table({
      padColumns: this._config.elements.table.padColumns,
      includeNewLine: this._config.elements.table.includeNewLine,
      ...options,
    });
  }

  public ul(options: UnorderedListOptions): string {
    return ul({
      indent: this._config.elements.ul.indent,
      indentIncrement: this._config.elements.ul.indentIncrement,
      includeNewLine: this._config.elements.ul.includeNewLine,
      ...options,
    });
  }
}
