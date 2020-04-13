/*
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

import * as React from "react";
import { shallow } from "enzyme";
import { ErrorDisplay } from "../error-display";

test("smoke test", () => {
  const rendered = shallow(
    <ErrorDisplay error={"Testing error"} onClose={() => undefined} />
  );
  expect(rendered).toMatchSnapshot();
});
