/*
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

import { React, Component, Rendered } from "../../app-framework";

interface Props {
  id: string;
}

export class HiddenInputCell extends Component<Props, {}> {
  render(): Rendered {
    return <div>hidden</div>;
  }
}
