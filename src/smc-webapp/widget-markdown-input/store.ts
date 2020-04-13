/* 
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

// 3rd Party Libraries
import * as immutable from "immutable";

// Internal Libraries
import { Store } from "../app-framework/Store";

export interface MarkdownWidgetStoreState {
  open_inputs: immutable.Map<any, any>;
}

export class MarkdownWidgetStore extends Store<MarkdownWidgetStoreState> {
  getInitialState = function () {
    return {
      open_inputs: immutable.Map({}),
    };
  };
}
