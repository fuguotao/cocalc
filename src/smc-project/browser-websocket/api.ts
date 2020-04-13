/* 
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

import { get_listing, ListingEntry } from "../directory-listing";
async function listing(
  path: string,
  hidden?: boolean
): Promise<ListingEntry[]> {
  return await get_listing(path, hidden);
}

import { handle_request as jupyter } from "../jupyter/websocket-api";

// Execute code
const { execute_code } = require("smc-util-node/misc_node");
interface ExecuteOutput {
  stdout: string;
  stderr: string;
  exit_code: number;
}
export async function exec(opts: any): Promise<ExecuteOutput> {
  return await callback_opts(execute_code)(opts);
}
