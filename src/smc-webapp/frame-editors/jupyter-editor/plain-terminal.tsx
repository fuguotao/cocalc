/*
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

/*
Frame for working with a plain command line (bash) terminal.
*/

import { React, Rendered, Component } from "../../app-framework";

interface Props {
  project_id: string;
  path: string;
  font_size: number;
}

export class PlainTerminal extends Component<Props, {}> {
  render(): Rendered {
    return (
      <div>
        Plain Terminal in same directory as ipynb file -- {this.props.path}
      </div>
    );
  }
}
