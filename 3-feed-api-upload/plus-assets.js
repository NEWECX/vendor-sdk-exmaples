'use strict';

const node_path = require('path');
const { set_data_dir, api_upload_all_files } = require('@samwen/vendor-sdk');

(async () => {

    try {
        const project_root = node_path.dirname(__dirname);
        const data_dir = node_path.join(project_root, '1-template');
        set_data_dir(data_dir);
     
        const result = await api_upload_all_files();

        console.log(result);
        
    } catch (err) {
        console.error(err.message);
    }

})();