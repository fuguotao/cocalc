/*
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

private render_document_sagews(): Rendered {
    if (this.props.docpath == null || this.props.project_id == null) return;
    const doc = this.get_doc();
    if (doc == null) return;
    return (
      <SagewsCodemirror
        content={doc.to_str()}
        path={this.props.docpath}
        project_id={this.props.project_id}
        font_size={this.props.font_size}
        editor_settings={this.props.editor_settings}
      />
    );
  }

  private render_document_codemirror(): Rendered {
    if (this.props.docpath == null) return;
    const doc = this.get_doc();
    if (doc == null) return;
    return (
      <Document
        actions={this.props.actions}
        id={this.props.id}
        doc={doc.to_str()}
        path={doc.value == null ? "a.js" : this.props.docpath}
        project_id={this.props.project_id}
        font_size={this.props.font_size}
        editor_settings={this.props.editor_settings}
      />
    );
  }

  private get_diff_values():
    | { v0: string; v1: string; use_json: boolean }
    | undefined {
    if (
      this.props.docpath == null ||
      this.props.desc == null ||
      this.props.versions == null ||
      !this.props.desc.get("changes_mode")
    ) {
      return;
    }
    if (this.props.docext == "ipynb") {
      const syncdb = this.props.actions.syncdoc;
      if (syncdb == null) return;
      const d0 = this.props.versions.get(this.props.desc.get("version0"));
      if (d0 == null) return;
      const d1 = this.props.versions.get(this.props.desc.get("version1"));
      if (d1 == null) return;
      const v0 = json_stable(to_ipynb(syncdb, d0), { space: 1 });
      const v1 = json_stable(to_ipynb(syncdb, d1), { space: 1 });
      return { v0, v1, use_json: true };
    }

    const doc0 = this.get_doc(this.props.desc.get("version0"));
    if (doc0 == null) return; // something is wrong
    const v0 = doc0.to_str();
    const use_json = doc0.value == null;

    const doc1 = this.get_doc(this.props.desc.get("version1"));
    if (doc1 == null) return; // something is wrong
    const v1 = doc1.to_str();

    return { v0, v1, use_json };
  }

  private render_diff(): Rendered {
    if (
      this.props.docpath == null ||
      this.props.desc == null ||
      this.props.desc.get("changes_mode") != true
    )
      return;

    const x = this.get_diff_values();
    if (x == null) return this.render_loading();
    const { v0, v1, use_json } = x;

    if (this.props.docext == "sagews") {
      return (
        <SagewsDiff
          v0={v0}
          v1={v1}
          path={this.props.docpath}
          project_id={this.props.project_id}
          font_size={this.props.font_size}
          editor_settings={this.props.editor_settings}
        />
      );
    }

    return (
      <Diff
        v0={v0}
        v1={v1}
        path={this.props.docpath}
        font_size={this.props.font_size}
        editor_settings={this.props.editor_settings}
        use_json={use_json}
      />
    );
  }

  private render_navigation_buttons(): Rendered {
    if (this.props.desc == null || this.props.versions == null) return;
    let version0: number, version1: number;
    if (this.props.desc.get("changes_mode")) {
      version0 = this.props.desc.get("version0");
      version1 = this.props.desc.get("version1");
    } else {
      version0 = version1 = this.props.desc.get("version");
    }
    if (version0 == null || version1 == null) return;
    return (
      <NavigationButtons
        id={this.props.id}
        actions={this.props.actions}
        version0={version0}
        version1={version1}
        max={this.props.versions.size - 1}
      />
    );
  }

  private render_navigation_slider(): Rendered {
    if (
      this.props.desc == null ||
      this.props.versions == null ||
      this.props.desc.get("changes_mode")
    )
      return;
    return (
      <NavigationSlider
        id={this.props.id}
        actions={this.props.actions}
        version={this.props.desc.get("version")}
        max={this.props.versions.size - 1}
      />
    );
  }

  private render_range_slider(): Rendered {
    if (
      this.props.desc == null ||
      this.props.versions == null ||
      !this.props.desc.get("changes_mode")
    )
      return;
    return (
      <RangeSlider
        id={this.props.id}
        actions={this.props.actions}
        max={this.props.versions.size - 1}
        versions={this.props.versions}
        version0={this.props.desc.get("version0")}
        version1={this.props.desc.get("version1")}
      />
    );
  }

  private render_author(): Rendered {
    const version = this.get_version();
    if (version == null) return;
    if (this.props.desc == null) return;
    let version0: number, version1: number;
    if (this.props.desc.get("changes_mode")) {
      version0 = this.props.desc.get("version0");
      version1 = this.props.desc.get("version1");
    } else {
      version0 = version1 = this.props.desc.get("version");
    }
    if (version0 == null || version1 == null) return;
    return (
      <Authors
        actions={this.props.actions}
        version0={version0}
        version1={version1}
      />
    );
  }

  private render_load_full_history(): Rendered {
    if (this.props.has_full_history) return;
    return <LoadFullHistory actions={this.props.actions} />;
  }

  private render_open_file(): Rendered {
    if (this.props.is_subframe) return;
    return <OpenFile actions={this.props.actions} />;
  }

  private render_open_snapshots(): Rendered {
    if (this.props.is_subframe) return;
    return <OpenSnapshots actions={this.props.actions} />;
  }

  private render_revert_file(): Rendered {
    if (this.props.desc == null || this.props.desc.get("changes_mode")) return;
    return (
      <RevertFile actions={this.props.actions} version={this.get_version()} />
    );
  }

  private render_changes_mode(): Rendered {
    if (this.props.versions == null) return;
    return (
      <ChangesMode
        id={this.props.id}
        actions={this.props.actions}
        disabled={this.props.versions.size <= 1}
        changes_mode={
          this.props.desc != null && this.props.desc.get("changes_mode", false)
        }
      />
    );
  }
  private render_export(): Rendered {
    return <Export actions={this.props.actions} />;
  }

  private render_controls(): Rendered {
    return (
      <div
        style={{
          background: this.props.is_current ? "#fafafa" : "#ddd",
          borderBottom: "1px solid #ccc",
          marginLeft: "5px",
        }}
      >
        {this.render_changes_mode()}
        {this.render_navigation_buttons()}
        <ButtonGroup style={{ margin: "0 10px" }}>
          {this.render_load_full_history()}
          {this.render_open_file()}
          {this.render_revert_file()}
          {this.render_open_snapshots()}
          {this.render_export()}
        </ButtonGroup>
        {this.render_version()}
        {", "}
        {this.render_author()}
      </div>
    );
  }

  private render_time_select(): Rendered {
    return (
      <>
        {this.render_navigation_slider()}
        {this.render_range_slider()}
      </>
    );
  }

  private render_loading(): Rendered {
    return <Loading theme={"medium"} />;
  }

  private render_view(): Rendered {
    return (
      <>
        {this.render_document()}
        {this.render_diff()}
      </>
    );
  }

  public render(): Rendered {
    if (this.props.loading) {
      return this.render_loading();
    }
    return (
      <div className="smc-vfill">
        {this.render_controls()}
        {this.render_time_select()}
        {this.render_view()}
      </div>
    );
  }
}

const tmp = rclass(TimeTravel);
export { tmp as TimeTravel };
