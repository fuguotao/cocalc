/*
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

]),
    });
  }

  private render_insert(): Rendered {
    return this.render_menu({
      heading: "Insert",
      names: ["insert cell above", "insert cell below"],
      disabled: this.props.read_only,
    });
  }

  private render_cell(): Rendered {
    return this.render_menu({
      heading: "Cell",
      disabled: this.props.read_only,
      names: [
        "run cell",
        "run cell and select next",
        "run cell and insert below",
        "run all cells",
        "run all cells above",
        "run all cells below",
        "",
        "<Cell type...",
        ">change cell to code",
        ">change cell to markdown",
        ">change cell to raw",
        "",
        "<Selected output...",
        ">toggle cell output collapsed",
        ">toggle cell output scrolled",
        ">clear cell output",
        "",
        "<All output...",
        ">toggle all cells output collapsed",
        ">toggle all cells output scrolled",
        ">clear all cells output",
        "",
        "<Format code...",
        ">format cells",
        ">format all cells",
      ],
    });
  }

  // TODO: upper case kernel names, descriptions... and make it a new component for
  // efficiency so don't re-render if not change

  private handle_kernel_select(kernel_name: string): void {
    this.props.actions.set_kernel(kernel_name);
    this.focus();
    this.props.actions.set_default_kernel(kernel_name);
    analytics_event("cocal_jupyter", "change kernel", kernel_name);
  }

  private render_kernel_item(kernel: any): Rendered {
    const style: React.CSSProperties = { marginLeft: "4ex" };
    if (kernel.name === this.props.kernel) {
      style.color = "#2196F3";
      style.fontWeight = "bold";
    }
    return (
      <MenuItem
        key={kernel.name}
        onClick={() => {
          this.handle_kernel_select(kernel.name);
        }}
      >
        <span style={style}> {kernel.display_name} </span>
      </MenuItem>
    );
  }

  private render_kernel_items(): Rendered[] | undefined {
    if (this.props.kernels == null) {
      return;
    }
    const kernels = this.props.kernels.toJS();
    return kernels.map((kernel) => this.render_kernel_item(kernel));
  }

  private render_kernel(): Rendered {
    const items = this.render_kernel_items();
    const names: any[] = [
      `${this.props.kernel_state !== "busy" ? "<" : ""}interrupt kernel`,
      "confirm restart kernel",
      "<Restart and...",
      ">confirm restart kernel and clear output",
      ">confirm restart kernel and run all cells",
      ">confirm restart kernel and run all cells without halting on error",
      "",
      "<Change kernel...",
    ]
      .concat((items as any) || [])
      .concat(["", "refresh kernels"]);

    return this.render_menu({
      heading: "Kernel",
      names,
      disabled: this.props.read_only,
    });
  }

  private focus(): void {
    $(":focus").blur(); // battling with react-bootstrap stupidity... ?
    this.props.frame_actions.focus(true);
  }

  private handle_command(name: string): void {
    this.props.frame_actions.command(name);
    $(":focus").blur(); // battling with react-bootstrap stupidity... ?
    const c = this.props.frame_actions.commands[name];
    if (c && c.m && endswith(c.m, "...")) {
      this.props.frame_actions.blur();
    } else {
      this.focus();
    }
  }

  private command = (name: string): SelectCallback => {
    return () => {
      this.props.frame_actions.command(name);
      $(":focus").blur(); // battling with react-bootstrap stupidity... ?
      const c = this.props.frame_actions.commands[name];
      if (c && c.m && endswith(c.m, "...")) {
        this.props.frame_actions.blur();
      } else {
        this.focus();
      }
    };
  };

  private render_menu_item(
    key: string,
    name: MenuItemName
  ): { item: Rendered; command_name: string } {
    if (name === "") {
      return { item: <MenuDivider key={key} />, command_name: "" };
    }

    if (name != null && (name as any).props != null) {
      return { item: name as Rendered, command_name: "" }; // it's already a MenuItem components
    }

    let display: undefined | string;
    let style: React.CSSProperties | undefined = undefined;

    if (typeof name === "object") {
      // use {name:'>nbconvert script', display:"Executable Script (.zzz)..."}, say, to be explicit about custom name to show
      ({ name, display, style } = name as any);
      if (style != null) {
        style = copy(style);
      }
    } else {
      display = undefined;
    }

    if (style == null) {
      style = {};
    }

    if (typeof name != "string") {
      throw Error("bug -- name must be a string at this point.");
    }

    let disabled: boolean;
    if (name[0] === "<") {
      disabled = true;
      name = name.slice(1);
    } else {
      disabled = false;
    }

    if (name[0] === ">") {
      style.marginLeft = "4ex";
      name = name.slice(1);
    }
    const obj = this.props.frame_actions.commands[name];
    if (obj == null) {
      const item = (
        <MenuItem disabled={disabled} key={key}>
          <span style={style}>{display != null ? display : name}</span>
        </MenuItem>
      );
      return { item, command_name: "" };
    }

    let s: Rendered;
    if (obj.k != null) {
      const v: Rendered[] = [];
      let i = 0;
      for (const shortcut of obj.k) {
        v.push(<KeyboardShortcut key={i} shortcut={shortcut} />);
        i += 1;
      }
      s = (
        <span className="pull-right" style={{ marginLeft: "1em" }}>
          {r_join(v, ", ")}
        </span>
      );
    } else {
      s = <span />;
    }

    if (!display) display = obj.menu;
    if (!display) display = obj.m;
    if (!display) display = name;

    const item = (
      <MenuItem key={key} disabled={disabled}>
        <span style={style}>
          {s} {display}{" "}
          {/* shortcut must be first! -- https://github.com/sagemathinc/cocalc/issues/1935 */}
        </span>
      </MenuItem>
    );
    return { item, command_name: name };
  }

  private render_menu_items(
    names: MenuItemName[]
  ): { items: Rendered[]; command_names: { [key: string]: string } } {
    const items: Rendered[] = [];
    const command_names: { [key: string]: string } = {};
    for (const key in names) {
      const { item, command_name } = this.render_menu_item(key, names[key]);
      items.push(item);
      command_names[key] = command_name;
    }
    return { items, command_names };
  }

  private render_menu(opts: {
    heading: string;
    names: MenuItemName[];
    disabled?: boolean;
  }): Rendered {
    let { heading, names, disabled } = opts;
    if (disabled == null) disabled = false;
    const { items, command_names } = this.render_menu_items(names);
    return (
      <DropdownMenu
        title={heading}
        key={heading}
        id={heading}
        disabled={opts.disabled}
        onClick={(key) => {
          const name = command_names[key];
          if (name == null) return;
          this.handle_command(name);
        }}
      >
        {items}
      </DropdownMenu>
    );
  }

  private render_links(): Rendered[] {
    if (this.props.kernel_info == null) return [];
    const v: Rendered[] = [];
    const lang = this.props.kernel_info.get("language");
    const links = get_help_links(lang);
    if (links == null) return v;
    for (const name in links) {
      const url = links[name];
      v.push(external_link(name, url));
    }
    return v;
  }

  private render_help(): Rendered {
    return (
      <DropdownMenu
        key="help"
        id="menu-help"
        title={"Help"}
        style={TITLE_STYLE}
      >
        <MenuItem
          key="help-about"
          onClick={() => this.props.actions.show_about()}
        >
          <Icon name="question-circle" /> About...
        </MenuItem>
        <MenuDivider />
        <MenuItem
          key="help-keyboard"
          onClick={this.command("edit keyboard shortcuts")}
        >
          <Icon name="keyboard-o" /> Keyboard shortcuts...
        </MenuItem>
        <MenuDivider />
        {external_link(
          "Notebook help",
          "http://nbviewer.jupyter.org/github/ipython/ipython/blob/3.x/examples/Notebook/Index.ipynb"
        )}
        {external_link(
          "Jupyter in CoCalc",
          "https://doc.cocalc.com/jupyter.html"
        )}
        {external_link(
          "Markdown",
          "https://help.github.com/articles/basic-writing-and-formatting-syntax"
        )}
        <MenuDivider />
        {this.render_links()}
      </DropdownMenu>
    );
  }

  render() {
    return (
      <div
        style={{
          backgroundColor: "rgb(247,247,247)",
          border: "1px solid #e7e7e7",
          minHeight: "34px",
          paddingTop: "4px",
        }}
      >
        <ButtonGroup>
          {this.render_file()}
          {this.render_edit()}
          {this.render_view()}
          {this.render_insert()}
          {this.render_cell()}
          {this.render_kernel()}
          {this.render_help()}
        </ButtonGroup>
      </div>
    );
  }
}

export const TopMenubar = rclass(TopMenubar0);

function external_link(name: string, url: string): Rendered {
  return (
    <MenuItem key={name} onClick={() => misc_page.open_new_tab(url)}>
      <Icon name="external-link" /> {name}
    </MenuItem>
  );
}
