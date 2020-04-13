/* 
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

// see entry-point, and via this useful in all TS files
declare global {
  interface Window {
    COCALC_FULLSCREEN: string | undefined;
    COCALC_MINIMAL: boolean;
  }
}

export {};
