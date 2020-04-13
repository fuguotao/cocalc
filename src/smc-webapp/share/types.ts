/* 
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

export interface Author {
  name: string;
  account_id: string;
}

export type IsPublicFunction = (project_id: string, path: string) => boolean;
