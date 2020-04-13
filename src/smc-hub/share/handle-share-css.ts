/* 
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

export function handle_share_css(_req: any, res: any): void {
  res.type("text/css");
  res.send(`\
.cocalc-jupyter-anchor-link {
  visibility : hidden
};\
`);
}
