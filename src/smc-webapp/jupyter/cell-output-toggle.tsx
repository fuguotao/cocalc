/*
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

}
        {this.props.children}
      </div>
    );
  }
}

interface CollapsedOutputProps {
  actions?: JupyterActions;
  id: string;
}

export class CollapsedOutput extends Component<CollapsedOutputProps> {
  show_output = () => {
    if (this.props.actions !== undefined) {
      this.props.actions.toggle_output(this.props.id, "collapsed");
    }
  };
  render() {
    // We use a bootstrap button for the output toggle area, but disable the padding
    // and border. This looks pretty good and consistent and clean.
    return (
      <div
        className="btn btn-default"
        onClick={this.show_output}
        style={{
          textAlign: "center",
          width: "100%",
          color: "#777",
          padding: 0,
        }}
      >
        <Icon name="ellipsis-h" />
      </div>
    );
  }
}
