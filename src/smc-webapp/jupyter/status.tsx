/*
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

let spin = false;
    let name: string | undefined;
    let color: string | undefined;
    switch (backend_state) {
      case "init":
        name = "unlink";
        break;
      case "ready":
        name = "circle-o-notch";
        break;
      case "spawning":
        name = "circle-o-notch";
        spin = true;
        break;
      case "starting":
        name = "circle-o-notch";
        spin = true;
        break;
      case "running":
        switch (this.props.kernel_state) {
          case "busy":
            name = "circle";
            color = "#5cb85c";
            break;
          case "idle":
            name = "circle-o";
            break;
          default:
            name = "circle-o";
        }
        break;
    }

    return (
      <span style={BACKEND_STATE_STYLE}>
        <Icon name={name} spin={spin} style={{ color }} />
      </span>
    );
  }

  render_trust() {
    if (this.props.trust) {
      if (!this.props.is_fullscreen) return;
      return <span style={{ color: "#888" }}>Trusted</span>;
    } else {
      return (
        <span
          title={"Notebook is not trusted"}
          style={{
            background: "#5bc0de",
            color: "white",
            cursor: "pointer",
            padding: "3px",
            borderRadius: "3px",
          }}
          onClick={() => this.props.actions.trust_notebook()}
        >
          Not Trusted
        </span>
      );
    }
  }

  render_tip(title: any, body: any) {
    let kernel_name;
    if (this.props.kernel_info != null) {
      kernel_name = (
        <div>
          <b>Kernel: </b>
          {this.props.kernel_info.get("display_name", "No Kernel")}
        </div>
      );
    } else {
      kernel_name = <span />;
    }
    let kernel_tip;
    const { backend_state } = this.props;
    const backend_tip = `Backend is ${backend_state}.`;
    if (backend_state === "running") {
      switch (this.props.kernel_state) {
        case "busy":
          kernel_tip = " Kernel is busy.";
          break;
        case "idle":
          kernel_tip = " Kernel is idle.";
          break;
        default:
          kernel_tip = " Kernel will start when you run code.";
      }
    } else {
      kernel_tip = "";
    }

    const tip = (
      <span>
        {kernel_name}
        {backend_tip}
        {kernel_tip ? <br /> : undefined}
        {kernel_tip}
      </span>
    );
    return (
      <Tip title={title} tip={tip} placement={"leftTop"}>
        {body}
      </Tip>
    );
  }

  render_usage() {
    let cpu, cpu_style, memory, memory_style;
    if (this.props.kernel_usage == null) {
      // unknown, e.g, not reporting/working or old backend.
      return;
    }
    if (
      this.props.backend_state !== "running" &&
      this.props.backend_state !== "starting"
    ) {
      // not using resourcesw
      memory = cpu = 0;
    } else {
      memory = this.props.kernel_usage.get("memory");
      if (memory == null) {
        return;
      }
      cpu = this.props.kernel_usage.get("cpu");
      if (cpu == null) {
        return;
      }
      memory = Math.round(memory / 1000000);
      cpu = Math.round(cpu);
      cpu_style = memory_style = undefined;
      if (cpu > 10 && cpu < 50) {
        cpu_style = { backgroundColor: "yellow" };
      }
      if (cpu > 50) {
        cpu_style = { backgroundColor: "rgb(92,184,92)", color: "white" };
      }
      if (memory > 500) {
        memory_style = { backgroundColor: "yellow" };
      }
      if (memory > 800) {
        // TODO: depend on upgrades...?
        memory_style = { backgroundColor: "red", color: "white" };
      }
    }
    const tip = (
      <div>
        Usage of the kernel process updated every few seconds.
        <br />
        Does NOT include subprocesses.
        <br />
        You can clear all memory by selecting Close and Halt from the File menu
        or restarting your kernel.
      </div>
    );
    return (
      <Tip title="Kernel CPU and Memory Usage" tip={tip} placement={"bottom"}>
        {this.render_usage_text(cpu, memory, cpu_style, memory_style)}
      </Tip>
    );
  }

  render_usage_text(cpu, memory, cpu_style, memory_style) {
    if (this.props.is_fullscreen) {
      return (
        <span>
          <span style={KERNEL_USAGE_STYLE}>
            CPU: <span style={cpu_style}>{cpu}%</span>
          </span>
          <span style={KERNEL_USAGE_STYLE}>
            Memory:{" "}
            <span style={memory_style}>
              {memory}
              MB
            </span>
          </span>
        </span>
      );
    } else {
      return (
        <span>
          <span style={cpu_style}>{cpu}%</span>{" "}
          <span style={memory_style}>
            {memory}
            MB
          </span>
        </span>
      );
    }
  }

  render() {
    if (this.props.kernel == null) {
      return <span />;
    }
    const title = (
      <span>
        {this.render_usage()}
        {this.render_trust()}
        {this.render_name()}
      </span>
    );
    const body = (
      <div
        className="pull-right"
        style={{ color: "#666", cursor: "pointer", marginTop: "7px" }}
      >
        {title}
        {this.render_backend_state_icon()}
      </div>
    );
    return (
      <span>
        {this.render_logo()}
        {this.render_tip(title, body)}
      </span>
    );
  }
}

export const Kernel = rclass(Kernel0);
