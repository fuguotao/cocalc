/* 
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

import {
  NBGraderAPIOptions,
  NBGraderAPIResponse,
} from "../smc-webapp/jupyter/nbgrader/api";

export async function nbgrader(
  client,
  logger,
  opts: NBGraderAPIOptions
): Promise<NBGraderAPIResponse> {
  logger.debug("nbgrader", opts);
  client = client;
  return { output: opts };
}
