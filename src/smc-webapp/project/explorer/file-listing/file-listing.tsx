/*
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

}

  private render_terminal_mode(): Rendered {
    if (this.props.file_search[0] === TERM_MODE_CHAR) {
      return <TerminalModeDisplay />;
    }
  }

  public render(): Rendered {
    return (
      <>
        <Col
          sm={12}
          style={{
            flex: "1 0 auto",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {!this.props.public_view && this.render_terminal_mode()}
          {this.props.listing.length > 0 && (
            <ListingHeader
              active_file_sort={this.props.active_file_sort}
              sort_by={this.props.sort_by}
            />
          )}
          {this.props.listing.length > 0 && (
            <Row className="smc-vfill">{this.render_rows()}</Row>
          )}
          {this.render_no_files()}
        </Col>
        <VisibleMDLG>{this.render_first_steps()}</VisibleMDLG>
      </>
    );
  }
}
