/* 
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

/* enable fullscreen mode upon a URL like /app?fullscreen and additionally
   kiosk-mode upon /app?fullscreen=kiosk
*/

import { QueryParams } from "./misc/query-params";

import "./misc/window-globals";

export const COCALC_FULLSCREEN = QueryParams.get("fullscreen");
export const COCALC_MINIMAL = COCALC_FULLSCREEN === "kiosk";
if (COCALC_MINIMAL) {
  console.log("CoCalc Kiosk Mode");
}
