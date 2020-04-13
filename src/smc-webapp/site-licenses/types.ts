/* 
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

export interface SiteLicensePublicInfo {
  id: string;
  title: string;
  activates?: Date;
  expires?: Date;
  run_limit?: number;
  upgrades?: { [field: string]: number };
  running: number;
}
