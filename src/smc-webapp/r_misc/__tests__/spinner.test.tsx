/*
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

import * as React from "react";
import { shallow } from "enzyme";
import { Spinner } from "../spinner";

test("smoke test", () => {
  const rendered = shallow(<Spinner />);
  expect(rendered).toMatchSnapshot();
});
