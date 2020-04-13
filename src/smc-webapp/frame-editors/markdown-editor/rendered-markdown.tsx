/*
 *  Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
 *  License: see LICENSE.md
 */

>
        <div
          style={{
            maxWidth: MAX_WIDTH,
            margin: "10px auto",
            padding: "0 10px",
          }}
        >
          <Markdown
            value={value}
            project_id={this.props.project_id}
            file_path={path_split(this.props.path).head}
            safeHTML={true}
            reload_images={this.props.reload_images}
            highlight_code={true}
          />
        </div>
      </div>
    );
  }
}
