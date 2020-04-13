/* 
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

import { define, required } from "./define";
import { expectType } from "tsd";

test("Defaulted value should be defined", () => {
  interface Input {
    foo: number;
    bar: string;
    baz?: string;
    biz?: string;
  }
  interface Defaults {
    baz: string;
  }
  const A = define<Input, Defaults>({ foo: 0, bar: "" }, {
    foo: required,
    bar: required,
    baz: "defaulted",
  });

  expectType<string>(A.baz);
});
