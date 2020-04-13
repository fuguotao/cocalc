/*
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

} else {
      options0.readOnly = true;
    }

    this.cm = CodeMirror(function (elt) {
      if (node.parentNode == null) return;
      node.parentNode.replaceChild(elt, node);
    }, options0);

    this.cm.save = () => this.props.actions.save();
    if (this.props.actions != null && options0.keyMap === "vim") {
      this._vim_mode = true;
      this.cm.on("vim-mode-change", async (obj) => {
        if (obj.mode === "normal") {
          // The delay is because this must not be set when the general
          // keyboard handler for the whole editor gets called with escape.
          // This is ugly, but I'm not going to spend forever on this before
          // the #v1 release, as vim support is a bonus feature.
          await delay(0);
          this.props.frame_actions.setState({
            cur_cell_vim_mode: "escape",
          });
        } else {
          this.props.frame_actions.setState({ cur_cell_vim_mode: "edit" });
        }
      });
    } else {
      this._vim_mode = false;
    }

    const css: any = { height: "auto" };
    if (options0.theme == null) {
      css.backgroundColor = "#fff";
    }
    $(this.cm.getWrapperElement()).css(css);

    this._cm_last_remote = value;
    this.cm.setValue(value);
    if (this.key != null) {
      const info = cache[this.key];
      if (info != null && info.sel != null) {
        this.cm.getDoc().setSelections(info.sel, undefined, { scroll: false });
      }
    }
    this._cm_change = underscore.debounce(this._cm_save, SAVE_DEBOUNCE_MS);
    this.cm.on("change", this._cm_change);
    this.cm.on("focus", this._cm_focus);
    this.cm.on("blur", this._cm_blur);
    this.cm.on("cursorActivity", this._cm_cursor);

    // replace undo/redo by our sync aware versions
    this.cm.undo = this._cm_undo;
    this.cm.redo = this._cm_redo;

    if (this.props.frame_actions != null) {
      const editor: EditorFunctions = {
        save: this._cm_save,
        set_cursor: this._cm_set_cursor,
        tab_key: this.tab_key,
        shift_tab_key: this.shift_tab_key,
        refresh: this._cm_refresh,
        get_cursor: () => this.cm.getCursor(),
        get_cursor_xy: () => {
          const pos = this.cm.getCursor();
          return { x: pos.ch, y: pos.line };
        },
      };
      this.props.frame_actions.register_input_editor(this.props.id, editor);
    }

    if (this.props.click_coords != null) {
      // editor clicked on, so restore cursor to that position
      this.cm.setCursor(this.cm.coordsChar(this.props.click_coords, "window"));
      this.props.set_click_coords(); // clear them
    } else if (this.props.last_cursor != null) {
      this.cm.setCursor(this.props.last_cursor);
      this.props.set_last_cursor();
    }

    if (this.props.is_focused) {
      this.focus_cm();
    }
  }

  async componentWillReceiveProps(nextProps: CodeMirrorEditorProps) {
    if (this.cm == null) {
      this.init_codemirror(nextProps.options, nextProps.value);
      return;
    }
    if (!this.props.options.equals(nextProps.options)) {
      this.update_codemirror_options(nextProps.options, this.props.options);
    }
    if (
      this.props.font_size !== nextProps.font_size ||
      (this.props.is_scrolling && !nextProps.is_scrolling)
    ) {
      this._cm_refresh();
    }
    // In some cases (e.g., tab completion when selecting via keyboard)
    // nextProps.value and this.props.value are the same, but they
    // do not equal this.cm.getValue().  The complete prop changes
    // so the component updates, but without checking cm.getValue(),
    // we would fail to update the cm editor, which would is
    // a disaster.  May be root cause of
    //    https://github.com/sagemathinc/cocalc/issues/3978
    if (
      nextProps.value !== this.props.value ||
      (this.cm != null && nextProps.value != this.cm.getValue())
    ) {
      this._cm_merge_remote(nextProps.value);
    }
    if (nextProps.is_focused && !this.props.is_focused) {
      // gain focus
      if (this.cm != null) {
        this.focus_cm();
      }
    }
    if (!nextProps.is_focused && this._cm_is_focused) {
      // controlled loss of focus from store; we have to force
      // this somehow.  Note that codemirror has no .blur().
      // See http://codemirror.977696.n3.nabble.com/Blur-CodeMirror-editor-td4026158.html
      await delay(1);
      if (this.cm != null) {
        this.cm.getInputField().blur();
      }
    }
    if (this._vim_mode && !nextProps.is_focused && this.props.is_focused) {
      $(this.cm.getWrapperElement()).css({ paddingBottom: 0 });
    }
  }

  componentWillUnmount() {
    if (this.cm != null) {
      this._cm_save();
      this._cm_destroy();
    }
  }

  private focus_cm(): void {
    if (this.cm == null) return;
    // Because we use react-window, it is critical to preventScroll
    // when focusing!  Unfortunately, CodeMirror's api does not
    // expose this option, so we have to bypass it in the dangerous
    // way below, which could break were CodeMirror to be refactored!
    // TODO: send them a PR to expose this.
    (window as any).cm = this.cm;
    if (this.cm.display == null || this.cm.display.input == null) return;
    if (this.cm.display.input.textarea != null) {
      this.cm.display.input.textarea.focus({ preventScroll: true });
    } else if (this.cm.display.input.div != null) {
      this.cm.display.input.div.focus({ preventScroll: true });
    }
  }

  render_complete() {
    if (
      this.props.complete != null &&
      this.props.complete.get("matches") &&
      this.props.complete.get("matches").size > 0
    ) {
      return (
        <Complete
          complete={this.props.complete}
          actions={this.props.actions}
          frame_actions={this.props.frame_actions}
          id={this.props.id}
        />
      );
    }
  }

  render_cursors() {
    if (this.props.cursors != null) {
      return <Cursors cursors={this.props.cursors} codemirror={this.cm} />;
    }
  }

  render() {
    return (
      <div style={{ width: "100%", overflow: "auto" }}>
        {this.render_cursors()}
        <div style={FOCUSED_STYLE}>
          <pre
            ref={this.cm_ref}
            style={{
              width: "100%",
              backgroundColor: "#fff",
              minHeight: "25px",
            }}
          >
            {this.props.value}
          </pre>
        </div>
        {this.render_complete()}
      </div>
    );
  }
}
