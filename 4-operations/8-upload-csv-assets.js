'use strict';

const node_path = require('path');
const { set_data_dir, api_upload_all_files, write_to_csv } = require('@samwen/vendor-sdk');

(async () => {
     
    try {
        set_data_dir(__dirname);

        const result = await api_upload_all_files();

        //console.log(result);

        const report = [];
        if (result.inventory) {
            report.push({...result.inventory, type: 'inventory'});
        }
        if (result.assets && result.assets.length > 0) {
            for (const asset of result.assets) {
                report.push({...asset, type: 'asset'});
            }
        }

        const local_filepath = node_path.join(__dirname, 'upload-report.csv');
        const fields = ['type', 'status', 'file', 'certificate_lab', 'certificate_number'];
        write_to_csv(local_filepath, report, fields);

    } catch (err) {
        console.error(err.message);
    }

})();