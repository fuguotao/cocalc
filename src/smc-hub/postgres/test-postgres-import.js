/* 
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 *  
 */

require("coffeescript/register");
require("ts-node").register({
  cacheDirectory: process.env.HOME + "/.ts-node-cache",
});
require("../postgres.coffee");
