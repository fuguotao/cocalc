/*
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

import { React, Component, Rendered } from "smc-webapp/app-framework";

interface Props {
  account_id: string;
}

interface State {
  activity?: any;
}

export class Activity extends Component<Props, State> {
  render(): Rendered {
    return <div>Recent Activity</div>;
  }
}
