/*
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

/*
Rendering input part of a Sage worksheet cell
*/

import { fromJS } from "immutable";
import { React, Component, Rendered } from "../app-framework";
import { CodeMirrorStatic } from "../jupyter/codemirror-static";
import { FLAGS } from "smc-util/sagews";

const OPTIONS = fromJS({ mode: { name: "sagews" } });

interface Props {
  input?: string;
  flags?: string;
}

export class CellInput extends Component<Props> {
  private render_input(): Rendered {
    return (
      <CodeMirrorStatic
        value={this.props.input != null ? this.props.input : ""}
        options={OPTIONS}
        style={{ background: "white", padding: "10px" }}
      />
    );
  }

  public render(): Rendered {
    if (
      this.props.flags != null &&
      this.props.flags.indexOf(FLAGS.hide_input) != -1
    ) {
      return <span />;
    } else {
      return this.render_input();
    }
  }
}
