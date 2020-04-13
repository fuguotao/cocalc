/* 
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

import * as immutable from "immutable";

export type NotebookMode = "edit" | "escape";

export type CellType = "raw" | "markdown" | "code";

export type Scroll =
  | number
  | "cell visible"
  | "cell top"
  | "cell bottom"
  | "cell center"
  | "cell up"
  | "cell down"
  | "list up"
  | "list down";

export type ViewMode = "normal" | "json" | "raw";

export type KernelInfo = immutable.Map<string, any>;

export type CellToolbarName =
  | "slideshow"
  | "attachments"
  | "tags"
  | "metadata"
  | "create_assignment";

// TODO -- this is pretty complicated, but will ne nice to nail down.
export type Cell = immutable.Map<string, any>;
