/* 
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

export const Ansi = require("ansi-to-react");

export function is_ansi(s: any): boolean {
  return typeof s === "string" && s.indexOf("\u001b") !== -1;
}
