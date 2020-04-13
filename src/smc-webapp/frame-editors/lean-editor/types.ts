/* 
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

export interface Task {
  desc: string;
  end_pos_col: number;
  end_pos_line: number;
  pos_col: number;
  pos_line: number;
}

export interface Message {
  caption: string;
  end_pos_col: number;
  end_pos_line: number;
  pos_col: number;
  pos_line: number;
  severity: string;
  text: string;
}

export interface Completion {
  text: string;
  type: string;
}
