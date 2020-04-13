/*
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

import { React, Component, Rendered } from "../../app-framework";
import { Map } from "immutable";

interface Props {
  id: string;
  output: Map<string, Map<string, any>>;
}

export class OutputCell extends Component<Props, {}> {
  render(): Rendered {
    return <code>{JSON.stringify(this.props.output.toJS())}</code>;
  }
}
