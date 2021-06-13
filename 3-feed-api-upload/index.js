'use strict';

const node_path = require('path');
const { api_upload_inventory } = require('@samwen/vendor-sdk');

(async () => {
    
    try {
        const project_root = node_path.dirname(__dirname);
        const local_filepath = node_path.join(project_root, '1-template', 'inventory.csv');

        const result = await api_upload_inventory(local_filepath);

        console.log(result);
        
    } catch (err) {
        console.error(err.message);
    }

})();