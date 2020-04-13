/*
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

import { List } from "immutable";
import { Component, React, Rendered } from "../../app-framework";
import { license_field_names } from "./types";

export interface DisplayProps {
  managers: undefined | List<string>;
}
export class DisplayManagers extends Component<DisplayProps> {
  public render(): Rendered {
    if (this.props.managers == null) {
      return <span />;
    }
    return (
      <pre>{JSON.stringify(this.props.managers.toJS(), undefined, 2)}</pre>
    );
  }
}

export interface EditProps {
  license_id: string;
  license_field: license_field_names;
  managers: undefined | List<string>;
  onChange: Function;
}

export class EditManagers extends Component<EditProps> {
  private render_add_search() {
    return <input />;
  }

  public render(): Rendered {
    return (
      <div>
        <pre>{JSON.stringify(this.props.managers?.toJS(), undefined, 2)}</pre>
        <br />
        {this.render_add_search()}
      </div>
    );
  }
}
