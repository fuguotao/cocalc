/*
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

import * as React from "react";
import { shallow } from "enzyme";
import { UntrustedJavascript } from "../untrusted-javascript";

describe("basic test", () => {
  const wrapper = shallow(<UntrustedJavascript />);

  it("checks the output", () => {
    expect(wrapper.find("span").text()).toContain(
      "not running untrusted Javascript"
    );
  });
});
