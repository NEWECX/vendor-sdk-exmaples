'use strict';

const fs = require('fs');
const { api_get_fields_map, to_js } = require('@samwen/vendor-sdk');

(async () => {

    try {
        const result = await api_get_fields_map();
        
        if (result) {
            console.log(JSON.stringify(result, null, 2));
            update_field_map_dot_js(result);
        } else {
            console.log('failed to get fields_map');
        }
    } catch (err) {
        console.error(err.message);
    }
})();

function update_field_map_dot_js(result) {

    const filepath = __dirname + '/fields-map.js';
    if (fs.existsSync(filepath)) {
        fs.renameSync(filepath, filepath + '-saved-' + new Date().toISOString().replace(/-|T|:|\.|Z/g, ''))
    }

    const content = '\'use strict\';\n\nconst fields_map = ' + to_js(result) + ';\n\nmodule.exports = fields_map;';
    fs.writeFileSync(filepath, content);
}