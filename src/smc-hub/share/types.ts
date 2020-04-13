/* 
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

export interface Database {
  synctable: Function;
  sha1: (...args) => string;
  _query: (opts: object) => void;
  get_usernames: (opts: object) => void;
}

export interface Logger {
  debug: Function;
  info: Function;
  warn: Function;
}
