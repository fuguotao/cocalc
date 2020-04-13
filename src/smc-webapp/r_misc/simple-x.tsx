/*
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

import * as React from "react";
import { Icon } from "./icon";

interface Props {
  onClick: () => void;
}

export function SimpleX({ onClick }: Props) {
  return (
    <a
      href=""
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      <Icon name="times" />
    </a>
  );
}
