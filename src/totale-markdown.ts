import merge from "deepmerge";
import { Nullish, Records } from "@totale/utils";
import {
  heading,
  link,
  ul,
  type HeadingOptions,
  type LinkOptions,
  type UnorderedListOptions,
} from "./index.js";

export type FullConfig = {
  elements: {
    heading: {
      includeNewLine: boolean;
    };
    ul: {
      includeNewLine: boolean;
      indent: number;
      indentIncrement: number;
    };
  };
};

export type PartialConfig = Records.DeepPartial<FullConfig>;

export class TotaleMarkdown {
  private _config: FullConfig;
  public static readonly DEFAULT_CONFIG: FullConfig = {
    elements: {
      heading: {
        includeNewLine: true,
      },
      ul: {
        includeNewLine: true,
        indent: 0,
        indentIncrement: 2,
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

  public ul(options: UnorderedListOptions): string {
    return ul({
      includeNewLine: this._config.elements.ul.includeNewLine,
      indent: this._config.elements.ul.indent,
      indentIncrement: this._config.elements.ul.indentIncrement,
      ...options,
    });
  }
}
