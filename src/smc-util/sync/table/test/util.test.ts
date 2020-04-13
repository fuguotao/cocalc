/* 
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

import { to_key } from "../util";

test("convert string to string key", () => {
  expect(to_key("foo")).toBe("foo");
});

test("convert string[] to string key", () => {
  expect(to_key(["foo", "bar"])).toBe('["foo","bar"]');
});

test("convert undefined to string key", () => {
  expect(to_key(undefined)).toBe(undefined);
});
