/* 
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

export function math_escape(s: string): string {
  for (let i = 0; i < escape_map.length; i++) {
    s = replace_all(s, "\\" + escape_map[i], unescape_map[i]);
  }
  return s;
}

export function math_unescape(s: string): string {
  for (let i = 0; i < escape_map.length; i++) {
    s = replace_all(s, unescape_map[i], "\\" + escape_map[i]);
  }
  return s;
}
