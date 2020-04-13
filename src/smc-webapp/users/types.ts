/* 
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

import { Map } from "immutable";

export type UserMap = Map<string, any>; // TODO

export interface UsersState {
  user_map: UserMap;
}
