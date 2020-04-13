###
# Copyright: 2012 - 2020 by CoCalc by Sagemath, Inc.
# License: see LICENSE.md
###

Misc configuration functions.
###

os_path = require('path')

# Where projects are stored.
exports.project_path = ->
    return process.env.COCALC_PROJECT_PATH ? os_path.join(process.env.SALVUS_ROOT, 'data', 'projects')
