/* 
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

/*
Register the markdown editor
*/

import { Editor } from "./editor";
import { Actions } from "./actions";
import { register_file_editor } from "../frame-tree/register";

["md", "markdown"].map((ext) =>
  register_file_editor({
    ext,
    component: Editor,
    Actions,
  })
);
