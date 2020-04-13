/* 
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

/*
Utility function for determining the labels to put on file tabs.
*/

import { path_split } from "smc-util/misc2";

export function file_tab_labels(paths: string[]): string[] {
  const labels: string[] = [];
  const counts: { [filename: string]: number } = {};
  for (const path of paths) {
    const { tail } = path_split(path);
    counts[tail] = counts[tail] === undefined ? 1 : counts[tail] + 1;
    labels.push(tail);
  }
  for (let i = 0; i < labels.length; i++) {
    const label = labels[i];
    if (counts[label] > 1) {
      labels[i] = paths[i];
    }
  }
  return labels;
}
