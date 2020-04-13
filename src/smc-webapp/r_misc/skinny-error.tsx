/*
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

import * as React from "react";
import { SimpleX } from "./simple-x";

interface Props {
  error_text: string;
  on_close: () => void;
}

export function SkinnyError({ error_text, on_close }: Props) {
  return (
    <div style={{ color: "red" }}>
      <SimpleX onClick={on_close} /> {error_text}
    </div>
  );
}
