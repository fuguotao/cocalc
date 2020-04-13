/*
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

import * as React from "react";

interface Props {
  size?: number; // Default 16
  url: string;
  outer_style?: React.CSSProperties;
}

export function ProfileIcon({ size = 24, url, outer_style }: Props) {
  const outer_style_defaults: React.CSSProperties = {
    height: `${size}px`,
    width: `${size}px`,
    lineHeight: `${size}px`,
    fontSize: `${0.7 * size}px`,
  };

  return (
    <div style={{ ...outer_style_defaults, ...outer_style }}>
      <img
        alt="crop-preview"
        style={{
          borderRadius: "50%",
          width: "100%",
          verticalAlign: "top",
        }}
        src={url}
      />
    </div>
  );
}
