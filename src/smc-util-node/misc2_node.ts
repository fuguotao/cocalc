/* 
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

import { to_human_list } from "../smc-util/misc";
import { re_url } from "../smc-util/misc2";
export { contains_url } from "../smc-util/misc2";

// returns undefined if ok, otherwise an error message
export function is_valid_username(str: string): string | undefined {
  const name = str.toLowerCase();

  const found = name.match(re_url);
  if (found) {
    return `URLs are not allowed. Found ${to_human_list(found)}`;
  }

  if (name.indexOf("mailto:") != -1 && name.indexOf("@") != -1) {
    return "email addresses are not allowed";
  }

  return;
}

// integer from process environment variable, with fallback
export function process_env_int(name: string, fallback: number): number {
  const val = process.env[name];
  if (val == null) return fallback;
  try {
    return parseInt(val);
  } catch {
    return fallback;
  }
}
