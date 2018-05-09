/* Declare CodeMirror plugins we use.

It was ridiculously hard to figure out how to declare this in TypeScript!
*/

import * as CodeMirror from "codemirror";

CodeMirror; // just to make typescript happy that CodeMirror is used.  The import above *is* needed.

declare module "codemirror" {
  interface Editor {
    setValueNoJump(value: string, scroll_last?: boolean): void;
    options: EditorConfiguration;
    edit_selection(opts: {
      cmd: string;
      args?: any;
      mode?: string;
      cb?: Function; // called after done; if there is a dialog, this could be a while.
    }): void;
  }
}
