/* 
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

import { redux } from "../app-framework";

export function has_internet_access(project_id?: string): boolean {
  if (project_id == null) return false;
  const store = redux.getStore("projects");
  return !!store.get_total_project_quotas(project_id)?.network;
}
