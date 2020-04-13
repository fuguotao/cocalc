/*
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

import { React, Component } from "../app-framework";

import { Icon } from "../r_misc";

// TODO: maybe clicking to reveal.
// This is just an mvp. See https://github.com/sagemathinc/cocalc/issues/3835

interface Props {
  title: string;
}

export class CellHiddenPart extends Component<Props, {}> {
  render() {
    return (
      <div
        style={{ color: "#aaa", fontSize: "14pt", paddingLeft: "15px" }}
        title={this.props.title}
      >
        <Icon name={"ellipsis-h"} />
      </div>
    );
  }
}
