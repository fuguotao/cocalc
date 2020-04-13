###
# Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
# License: see LICENSE.md
###

fs   = require('fs')
path = require('path')
program = require('commander')

path_to_base_url = path.join(process.env['SALVUS_ROOT'], 'data', 'base_url')
BASE_URL = if fs.existsSync(path_to_base_url) then fs.readFileSync(path_to_base_url).toString().trim() else ''

update = (base_url) ->
    opts =
        pathname    : path.join(BASE_URL, '/hub')

    console.log(opts)

    primus = new require('primus')(require('http').createServer(), opts)

    fs.writeFileSync('primus-engine.js', primus.library())

    process.exit()



program.usage('[options]').parse(process.argv)

update()
