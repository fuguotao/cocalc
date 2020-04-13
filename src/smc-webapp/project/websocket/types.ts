/* 
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

export interface Channel {
  write(x: any): boolean;
  on(event: string, f: Function): void;
  end(): void;
  close(): void;
  connect(): void;
  conn: any;
  channel: string;
}
