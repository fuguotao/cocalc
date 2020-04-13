/* 
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

import "jquery";

declare global {
  interface JQuery {
    make_height_defined(): JQuery;
  }
}
