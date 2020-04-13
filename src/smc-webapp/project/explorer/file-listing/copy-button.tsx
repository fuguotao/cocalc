/*
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

import * as React from "react";

import { Space, Icon } from "../../../r_misc";
const { Button } = require("react-bootstrap");

export function CopyButton({ on_click }) {
  return (
    <span>
      <Space />
      <Button bsStyle="info" bsSize="xsmall" onClick={on_click}>
        <Icon name="files-o" /> <span className="hidden-xs">Copy</span>
      </Button>
    </span>
  );
}
