###
# Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
# License: see LICENSE.md
###

Button to empty the trash, thus "permanently" deleting all deleted tasks.
###

{React, rclass, rtypes}  = require('../app-framework')

{Button} = require('react-bootstrap')

{plural} = require('smc-util/misc')

exports.EmptyTrash = rclass
    propTypes:
        actions : rtypes.object
        count   : rtypes.number

    shouldComponentUpdate: (next) ->
        return @props.count != next.count

    empty_trash: ->
        @props.actions.stop_showing_deleted()
        @props.actions.empty_trash()

    render: ->
        if not @props.actions?
            return <span />

        tasks = plural(@props.count, 'task')
        <Button bsStyle='danger' onClick={@empty_trash} disabled={@props.count==0}>
            Empty Trash ({@props.count})
        </Button>