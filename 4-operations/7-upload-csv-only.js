'use strict';

const node_path = require('path');
const { api_upload_inventory } = require('@samwen/vendor-sdk');

(async () => {
    
    try {
        const local_filepath = node_path.join(__dirname, 'inventory.csv');

        const result = await api_upload_inventory(local_filepath);

        console.log(result);
        
    } catch (err) {
        console.error(err.message);
    }

})();