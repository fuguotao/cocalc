###
# Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
# License: see LICENSE.md
###

Button bar for media viewer

- this is very simple, of course...

For now we just pass in a single function and don't bother with actions/redux, etc.,
since there is no state or need for it...
###

{React, ReactDOM, rclass, rtypes}  = require('../app-framework')

{Icon} = require('../r_misc')

{Button} = require('react-bootstrap')


exports.ButtonBar = rclass
    displayName : "MediaViewer-ButtonBar"

    propTypes :
        refresh : rtypes.func.isRequired

    shouldComponentUpdate: ->  # never need to update -- it's a single button
        return false

    render: ->
        <div style={padding: '0 1px'}>
            <Button
                title   = {'Reload this, showing the latest version on disk.'}
                onClick = {@props.refresh}
            >
                <Icon name={'repeat'}/> Reload
            </Button>
        </div>
