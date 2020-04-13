/* 
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

/*
Top-level react component for editing markdown documents
*/

import { IFrameHTML } from "../html-editor/iframe-html";
import { CodemirrorEditor } from "../code-editor/codemirror-editor";
import { set } from "smc-util/misc2";
import { createEditor } from "../frame-tree/editor";
import { aux_file } from "../frame-tree/util";
import { SETTINGS_SPEC } from "../settings/editor";
import { terminal } from "../terminal-editor/editor";
import { time_travel } from "../time-travel-editor/editor";

const EDITOR_SPEC = {
  cm: {
    short: "Code",
    name: "Source Code",
    icon: "code",
    component: CodemirrorEditor,
    buttons: set([
      "print",
      "decrease_font_size",
      "increase_font_size",
      "save",
      "time_travel",
      "replace",
      "find",
      "goto_line",
      "cut",
      "paste",
      "copy",
      "undo",
      "redo",
      "reload",
    ]),
  },
  rst: {
    short: "View",
    name: "Rendered View (rst2html)",
    icon: "eye",
    component: IFrameHTML,
    buttons: set([
      "print",
      "decrease_font_size",
      "increase_font_size",
      "save",
      "time_travel",
      "reload",
    ]),
    path(path) {
      return aux_file(path, "html");
    },
    fullscreen_style: {
      // set via jquery
      "max-width": "900px",
      margin: "auto",
    },
  },

  terminal,

  settings: SETTINGS_SPEC,

  time_travel,
};

export const Editor = createEditor({
  format_bar: true,
  editor_spec: EDITOR_SPEC,
  display_name: "RstEditor",
});
