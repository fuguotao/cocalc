/* 
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

export function dblclick(x: number, y: number): void {
  const ev = new MouseEvent("dblclick", {
    view: window,
    bubbles: true,
    cancelable: true,
    clientX: x,
    clientY: y,
  });

  const element = document.elementFromPoint(x, y);
  if (element != undefined) {
    element.dispatchEvent(ev);
  }
}
