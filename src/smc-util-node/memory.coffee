###
# Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
# License: see LICENSE.md
###

memwatch = require('node-memwatch')

exports.init = (log) ->
    memwatch.on 'leak', (info) ->
        log("MEMWATCH_LEAK='#{JSON.stringify(info)}'")
    memwatch.on 'stats', (stats) ->
        log("MEMWATCH_STATS='#{JSON.stringify(stats)}'")
