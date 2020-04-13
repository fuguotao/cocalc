/* 
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

/*
Register the course frame tree editor
*/

import { Editor } from "./editor";
import { CourseEditorActions } from "./actions";

import { register_file_editor } from "../frame-tree/register";

register_file_editor({
  ext: "course",
  component: Editor,
  Actions: CourseEditorActions,
  is_public: false,
});
