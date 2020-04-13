/* 
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

// Maybe should go in app-framework ... ?

import { redux } from "../app-framework";

export function actions(name: string): any {
  const a = redux.getActions(name);
  if (a == null) {
    throw Error(`actions "${name}" not available`);
  }
  return a;
}
