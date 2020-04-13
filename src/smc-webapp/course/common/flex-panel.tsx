/*
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

import { Rendered, React, Component } from "../../app-framework";

export class FlexPanel extends Component<{ header: any }> {
  render(): Rendered {
    return (
      <div className={"panel panel-default smc-vfill"}>
        <div className="panel-heading">{this.props.header}</div>
        <div className="panel-body smc-vfill">{this.props.children}</div>
      </div>
    );
  }
}
