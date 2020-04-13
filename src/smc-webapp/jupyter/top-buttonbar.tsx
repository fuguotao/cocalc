/*
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

<ButtonGroup>
        <DropdownMenu
          style={{ height: "34px" }}
          cocalc-test={"jupyter-cell-type-dropdown"}
          button={true}
          key={"cell-type"}
          title={title}
          disabled={this.props.read_only}
          onClick={(key) => this.cell_select_type(key)}
        >
          <MenuItem cocalc-test={"code"} key={"code"}>
            {TopButtonbar0.cell_type_title("code")}
          </MenuItem>
          <MenuItem cocalc-test={"markdown"} key={"markdown"}>
            {TopButtonbar0.cell_type_title("markdown")}
          </MenuItem>
          <MenuItem cocalc-test={"raw"} key={"raw"}>
            {TopButtonbar0.cell_type_title("raw")}
          </MenuItem>
          <MenuItem cocalc-test={"multi"} key={"multi"} disabled>
            {TopButtonbar0.cell_type_title("multi")}
          </MenuItem>
        </DropdownMenu>
      </ButtonGroup>
    );
  }

  render_keyboard() {
    return this.render_button("0", "show keyboard shortcuts");
  }

  render_snippets() {
    return this.render_button("snippets", {
      name: "show code snippets",
      label: <VisibleMDLG>Snippets</VisibleMDLG>,
    });
  }

  // TODO -- should just be a frame at some point.
  render_switch_button() {
    // TODO: does "$" have a "browser" property?
    if (this.props.fullscreen === "kiosk" || ($ as any).browser.firefox) {
      return;
    }
    return (
      <Button
        title="Switch to classical notebook"
        onClick={() => this.props.actions.switch_to_classical_notebook()}
      >
        <Icon name="exchange" />{" "}
        <span className="hidden-sm">Classical notebook...</span>
      </Button>
    );
  }

  render_close_and_halt() {
    const obj = {
      name: "close and halt",
      disabled: false,
      label: <VisibleMDLG>Halt</VisibleMDLG>,
    };
    return this.render_button("close and halt", obj);
  }

  private render_group_assistant_halt(): Rendered {
    return (
      <ButtonGroup className="hidden-xs">
        {this.render_snippets()}
        {this.render_close_and_halt()}
      </ButtonGroup>
    );
  }

  private render_nbgrader(): Rendered {
    // TODO: only show if there is nbgrader metadata...
    // or better, if there are nbgrader test cells.
    const validate = {
      name: "nbgrader validate",
      disabled: false,
      label: "Validate",
    };
    const assign = {
      name: "nbgrader assign",
      disabled: false,
      label: "Generate student version",
    };
    return (
      <ButtonGroup style={{ marginLeft: "5px" }}>
        {this.render_button("nbgrader validate", validate)}
        {this.props.cell_toolbar == "create_assignment"
          ? this.render_button("nbgrader assign", assign)
          : undefined}
      </ButtonGroup>
    );
  }

  public render(): Rendered {
    return (
      <Form inline style={{ whiteSpace: "nowrap" }}>
        {this.render_add_cell()}
        <span style={{ marginLeft: "5px" }} />
        {this.render_group_move()}
        <span style={{ marginLeft: "5px" }} />
        {this.render_group_run()}
        <span style={{ marginLeft: "5px" }} />
        {this.render_select_cell_type()}
        <span style={{ marginLeft: "5px" }} />
        {this.render_keyboard()}
        <span style={{ marginLeft: "5px" }} />
        {this.render_group_assistant_halt()}
        {this.render_nbgrader()}
      </Form>
    );
  }
}

export const TopButtonbar = rclass(TopButtonbar0);
