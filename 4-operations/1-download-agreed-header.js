'use strict';

const fs = require('fs');
const { api_get_header, to_js } = require('@samwen/vendor-sdk');

(async () => {

    try {
        const result = await api_get_header();
        
        if (result) {
            console.log(JSON.stringify(result, null, 2));
            update_agreed_header_dot_js(result);
        } else {
            console.log('failed to get fields_map');
        }
    } catch(err) {
        console.error(err.message);
    }
})();

function update_agreed_header_dot_js(result) {

    const filepath = __dirname + '/agreed-header.js';
    if (fs.existsSync(filepath)) {
        fs.renameSync(filepath, filepath + '-saved-' + new Date().toISOString().replace(/-|T|:|\.|Z/g, ''))
    }

    const content = '\'use strict\';\n\nconst agreed_header = ' + to_js(result) + ';\n\nmodule.exports = agreed_header;';
    fs.writeFileSync(filepath, content);
}