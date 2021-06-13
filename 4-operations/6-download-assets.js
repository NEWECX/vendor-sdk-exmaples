'use strict';

const fs = require('fs');
const node_path = require('path');
const { set_data_dir, read_from_csv, download_assets, assets_stats_types, write_to_csv } = require('@samwen/vendor-sdk');

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

        //console.log(JSON.stringify(diamonds_stats, null, 2));

        const report = [];
        const total = {no: 'total'};
        let no = 1;
        for (const diamond of diamonds_stats) {
            const { lab, cert, assets_stats } = diamond;
            const row = {no, 'lab-cert#': lab + '-' + cert };
            for (const key in assets_stats) {
                for (const prop of ['provided', 'retrieved']) {
                    const value = assets_stats[key][prop];
                    const field = key + ' ' + prop;
                    row[field] = value;
                    if (!total.hasOwnProperty(field)) {
                        total[field] = 0; 
                    }
                    total[field] += value;
                }
            }
            report.push(row);
            no++;
        }
        report.push(total);

        const fields = ['no', 'lab-cert#'];
        for (const key in assets_stats_types) {
            const value = assets_stats_types[key];
            for (const prop of ['provided', 'retrieved']) {
                const field = value + ' ' + prop;
                if (!fields.includes(field)) {
                    fields.push(field);
                }
            }
        }

        const report_filepath = node_path.join(__dirname, 'assets-report.csv');
        write_to_csv(report_filepath, report, fields);

        console.log('check ./assets-report.csv for assets retrieve report');

    } else {
        console.error(`not diamonds found in ./diamonds-passed.csv`);
    }
})();