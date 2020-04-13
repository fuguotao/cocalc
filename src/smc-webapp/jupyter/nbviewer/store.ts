/* 
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

import { List, Map } from "immutable";

import { Store } from "../../app-framework";

export interface NBViewerState {
  project_id: string;
  path: string;
  font_size: number;
  error?: string;
  loading?: Date;
  cells?: Map<string, any>;
  cell_list: List<string>;
  cm_options: Map<string, any>;
}

export class NBViewerStore extends Store<NBViewerState> {}
