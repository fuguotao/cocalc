/*
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

continue;
      }
      opts.set_gutter(
        item.file,
        item.line - 1,
        component(item.level, item.message, item.content)
      );
    }
  }
}

function component(
  level: string,
  message: string,
  content: string | undefined
) {
  const spec: SpecItem = SPEC[level];
  if (content === undefined) {
    content = message;
    message = capitalize(level);
  }
  // NOTE/BUG: despite allow_touch true below, this still does NOT work on my iPad -- we see the icon, but nothing
  // happens when clicking on it; this may be a codemirror issue.
  return (
    <Tip
      title={message}
      tip={content}
      placement={"right"}
      icon={spec.icon}
      stable={true}
      popover_style={{
        padding: 0,
        opacity: 0.9,
        border: `2px solid ${spec.color}`,
        borderRadius: "3px",
      }}
      delayShow={0}
      allow_touch={true}
    >
      <Icon name={spec.icon} style={{ color: spec.color, cursor: "pointer" }} />
    </Tip>
  );
}
