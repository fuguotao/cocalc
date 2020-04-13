/* 
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

/*
Render a page describing a user.

For now this is:
 - their name
 - a list of links to public paths that they definitely are involved with
*/
import { Map, List } from "immutable";

import { React } from "smc-webapp/app-framework";
import { UserPage } from "smc-webapp/share/user-page";
import * as react_support from "smc-webapp/share/server-render";

export function render_user(opts: {
  res: any;
  account_id: string;
  name: string;
  public_paths: Map<string, any>;
  paths_order: List<string>;
  google_analytics?: string;
  base_url: string;
}): void {
  const component = React.createElement(UserPage, opts);
  react_support.render(opts.res, component);
}
