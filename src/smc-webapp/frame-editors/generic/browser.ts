/* 
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

import * as jQuery from "jquery";

export function is_safari(): boolean {
  const $: any = jQuery;
  if ($.browser !== undefined && $.browser.safari) {
    return true;
  } else {
    return false;
  }
}
