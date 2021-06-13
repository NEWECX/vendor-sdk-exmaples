'use strict';

const fs = require('fs');
const node_path = require('path');
const { set_data_dir, read_from_csv, download_assets } = require('@samwen/vendor-sdk');

(async () => {
    const local_filepath = node_path.join(__dirname, 'diamonds-passed.csv');
    if (!fs.existsSync(local_filepath)) {
        console.error(`please run 3-validate-feed-csv first, ${local_filepath} not found`);
        return;
    }
    set_data_dir(__dirname);
    const diamonds = await read_from_csv(local_filepath);
    if (diamonds && diamonds.length > 0) {
        const diamonds_stats = await download_assets(diamonds);
        console.log(JSON.stringify(diamonds_stats, null, 2));
    } else {
        console.error(`not diamonds found in ./diamonds-passed.csv`);
    }
})();