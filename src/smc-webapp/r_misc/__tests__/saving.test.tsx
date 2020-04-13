/*
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

import * as React from "react";
import { shallow } from "enzyme";
import { Saving } from "../saving";

test("smoke test", () => {
  const rendered = shallow(<Saving />);
  expect(rendered).toMatchSnapshot();
});
