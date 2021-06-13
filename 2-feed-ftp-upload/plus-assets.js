'use strict';

const node_path = require('path');
const { set_data_dir, ftp_login, ftp_logout, ftp_upload_all_files, ftp_close } = require('@samwen/vendor-sdk');

(async () => {

    await ftp_login(async () => {
        
        try {
            const project_root = node_path.dirname(__dirname);
            const data_dir = node_path.join(project_root, '1-template');    
            set_data_dir(data_dir);

            const result = await ftp_upload_all_files();

            console.log(result);
            
        } catch (err) {
            console.error(err.message);
        }
        await ftp_logout();
        ftp_close();

    });
})();