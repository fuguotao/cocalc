/*
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

let wrap = this.render_wrap(index, key, isScrolling);
      if (windowed_list.props.hide_resize) {
        wrap = <div style={{ overflow: "hidden", height: "100%" }}>{wrap}</div>;
      }
      return (
        <div style={style} key={`${index}-${key}`}>
          {wrap}
        </div>
      );
    }
  }
  return RowComponent;
}
