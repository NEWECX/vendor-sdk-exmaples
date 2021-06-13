'use strict';

const node_path = require('path');
const { ftp_login, ftp_logout, ftp_upload_inventory, ftp_close } = require('@samwen/vendor-sdk');

(async () => {

    await ftp_login(async () => {

        try {
            const project_root = node_path.dirname(__dirname);
            const local_filepath = node_path.join(project_root, '1-template', 'inventory.csv');

            const result = await ftp_upload_inventory(local_filepath);

            console.log(result);
            
        } catch(err) {
            console.error(err.message);
        }
        await ftp_logout();
        ftp_close();
    });

})();