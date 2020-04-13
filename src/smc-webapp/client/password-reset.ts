/* 
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

import { QueryParams } from "../misc/query-params";

export function reset_password_key() {
  // some mail transport agents will uppercase the URL -- see https://github.com/sagemathinc/cocalc/issues/294
  const forgot = QueryParams.get("forgot");
  if (forgot && typeof forgot == "string") {
    return forgot.toLowerCase();
  }
  return undefined;
}
