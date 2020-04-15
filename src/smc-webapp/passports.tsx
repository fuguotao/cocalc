import * as React from "react";
import { List } from "immutable";
import * as misc from "smc-util/misc";
import { Rendered } from "./app-framework";
import { Icon, Tip } from "./r_misc";
import { SiteName } from "./customize";
import { PassportStrategy, PRIMARY_SSO } from "./passport-types";
import { COLORS } from "smc-util/theme";

interface Props {
  strategies?: List<PassportStrategy>;
  get_api_key?: string;
  no_heading?: boolean;
  style?: object;
  disabled?: boolean;
}

const BASE_ICON_STYLE: React.CSSProperties = Object.freeze({
  display: "inline-block",
  padding: "6px",
  borderRadius: "50%",
  width: "50px",
  height: "50px",
  marginRight: "10px",
  textAlign: "center",
});

const CUSTOM_ICON_STYLE = Object.freeze(
  Object.assign({}, BASE_ICON_STYLE, {
    position: "relative", // unclear why, somehow due to faking these fa-icons
    top: "14px", // unclear why, somehow due to faking these fa-icons
    backgroundSize: "contain",
  } as React.CSSProperties)
);

const TEXT_ICON_STYLE: React.CSSProperties = Object.freeze({
  backgroundColor: COLORS.GRAY_D,
  color: "white",
  fontSize: "24px",
  display: "inline-block",
  padding: "6px",
  height: "50px",
  marginRight: "10px",
  textAlign: "center",
  borderRadius: "10px",
});

const PASSPORT_ICON_STYLES = {
  facebook: {
    backgroundColor: "#395996",
    color: "white",
  },
  google: {
    backgroundColor: "#DC4839",
    color: "white",
  },
  twitter: {
    backgroundColor: "#55ACEE",
    color: "white",
  },
  github: {
    backgroundColor: "white",
    color: "black",
  },
};

export class Passports extends React.Component<Props> {
  static defaultProps = {
    strategies: List([]),
  };

  render_tip(passport_name: string) {
    return (
      <>
        Use {passport_name} to sign into your <SiteName /> account instead of an
        email address and password.
      </>
    );
  }

  private strategy_display_name(name: string, display?: string): string {
    return display ?? misc.capitalize(name);
  }

  private strategy_tip_title(name: string, passport_name: string) {
    return (
      <span>
        {PRIMARY_SSO.indexOf(name) >= 0 ? <Icon name={name} /> : undefined}{" "}
        {passport_name}
      </span>
    );
  }

  private strategy_style(): React.CSSProperties {
    const style: React.CSSProperties = { fontSize: "28px" };
    if (this.props.disabled) {
      style.opacity = 0.5;
    }
    return style;
  }

  private strategy_icon_style(name: string): React.CSSProperties {
    const style = Object.assign(
      {},
      BASE_ICON_STYLE,
      PASSPORT_ICON_STYLES[name]
    );

    return style;
  }

  private strategy_url(name: string): string {
    let url = "";
    if (!this.props.disabled) {
      url = `${window.app_base_url}/auth/${name}`;
      if (this.props.get_api_key) {
        url += `?get_api_key=${this.props.get_api_key}`;
      }
    }
    return url;
  }

  private strategy_icon(
    name: string,
    icon?: string,
    display?: string
  ): Rendered {
    if (PRIMARY_SSO.indexOf(name) >= 0) {
      const icon_style = this.strategy_icon_style(name);
      return <Icon name={name} style={icon_style} />;
    } else if (icon != null) {
      // icon is an URL
      const style = Object.assign({}, CUSTOM_ICON_STYLE, {
        backgroundImage: `url("${icon}")`,
      } as React.CSSProperties);
      return <div style={style} />;
    } else {
      return <div style={TEXT_ICON_STYLE}>{display}</div>;
    }
  }

  private render_strategy(strategy: PassportStrategy) {
    const { name, display, icon } = strategy;
    if (name === "email") return;
    const url = this.strategy_url(name);
    const passport_name = this.strategy_display_name(name, display);
    const title = this.strategy_tip_title(name, passport_name);
    const style = this.strategy_style();
    const strategy_icon = this.strategy_icon(name, icon, display);
    if (this.props.disabled) {
      return (
        <span key={name} style={style}>
          <Tip
            placement="bottom"
            title={title}
            tip={"Please agree to the terms of service first."}
          >
            {strategy_icon}
          </Tip>
        </span>
      );
    } else {
      return (
        <a href={url} key={name} style={style}>
          <Tip
            placement="bottom"
            title={title}
            tip={this.render_tip(passport_name)}
          >
            {strategy_icon}
          </Tip>
        </a>
      );
    }
  }

  private render_heading() {
    if (this.props.no_heading) {
      return;
    }
    const style: React.CSSProperties = { marginTop: 0 };
    if (this.props.disabled) {
      style.opacity = 0.5;
    }
    return <h3 style={style}>Connect with</h3>;
  }

  render() {
    // This any gets automatically fixed when upgrading to Typescript 3.1+
    const strategies = (this.props.strategies as any).toJS();
    return (
      <div style={this.props.style}>
        {this.render_heading()}
        <div>
          {strategies.map((strategy) => this.render_strategy(strategy))}
        </div>
        <hr style={{ marginTop: 10, marginBottom: 10 }} />
      </div>
    );
  }
}
