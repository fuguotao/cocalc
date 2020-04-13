/*
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

console.log(`WARNING: CodeMirror.runMode failed -- ${err}`);
    }
    line_numbers = false;
    append("\n"); // TODO: should this have 2 parameters?

    return v;
  };

  render_code() {
    // NOTE: for #v1 this line numbers code is NOT used for now.  It works perfectly regarding
    // look and layout, but there is trouble with copying, which copies the line numbers too.
    // This can be fixed via a standard trick of having an invisible text area or div
    // in front with the same content... but that's a speed optimization for later.
    let style: React.CSSProperties;
    let width: number;
    if (
      this.props.options != null
        ? this.props.options.get("lineNumbers")
        : undefined
    ) {
      const num_lines = this.props.value.split("\n").length;
      if (num_lines < 100) {
        width = 30;
      } else if (num_lines < 1000) {
        width = 35;
      } else if (num_lines < 10000) {
        width = 45;
      } else {
        // nobody better do this...?
        width = 69;
      }
      style = merge({ paddingLeft: `${width + 4}px` }, BLURRED_STYLE);
      if (this.props.style != null) {
        style = merge(style, this.props.style);
      }
    } else {
      width = 0;
      style = BLURRED_STYLE;
      if (this.props.style != null) {
        style = merge(copy(style), this.props.style);
      }
    }

    return (
      <pre className="CodeMirror cm-s-default CodeMirror-wrap" style={style}>
        <div style={{ marginLeft: width }}>
          {this.render_lines(width)}
          {this.render_gutter(width)}
        </div>
      </pre>
    );
  }

  render_gutter(width: number) {
    if (this.props.options && this.props.options.get("lineNumbers")) {
      return (
        <div className="CodeMirror-gutters">
          <div
            className="CodeMirror-gutter CodeMirror-linenumbers"
            style={{ width: `${width - 1}px` }}
          />
        </div>
      );
    }
  }

  render() {
    const style: React.CSSProperties = {
      width: "100%",
      borderRadius: "2px",
      position: "relative",
      overflowX: "auto",
    };
    if (!this.props.no_border) {
      style.border = "1px solid rgb(207, 207, 207)";
    }
    return <div style={style}>{this.render_code()}</div>;
  }
}
