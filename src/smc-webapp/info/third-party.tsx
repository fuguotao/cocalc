/*
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

import { React } from "../app-framework";
import { THIRD_PARTY } from "./links";
import { LinkList } from "./link-list";

// This is used for the dynamic frontend page.
export function ThirdPartySoftware(): JSX.Element {
  return (
    <LinkList title="Software" icon="question-circle" links={THIRD_PARTY} />
  );
}

// This is used for the static backend page
export function render_static_third_party_software(): JSX.Element {
  return (
    <LinkList title="" icon="question-circle" width={12} links={THIRD_PARTY} />
  );
}
