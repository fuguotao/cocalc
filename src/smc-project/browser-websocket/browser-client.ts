/* 
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

export class BrowserClient {
  private conn: any;
  private logger: any;

  constructor(conn, logger) {
    this.conn = conn;
    this.logger = logger;
  }
}
