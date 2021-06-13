'use strict';

const node_path = require('path');
const { parse_inventory_csv, std_fields, write_to_csv } = require('@samwen/vendor-sdk');

const agreed_header = require('./agreed-header');
const fields_map = require('./fields-map');

(async () => {
    
    try {
        const local_filepath = node_path.join(__dirname, 'inventory.csv');

        const result = await parse_inventory_csv(local_filepath, fields_map, agreed_header);

        if (result) {

            //console.log(JSON.stringify(result, null, 2));
            const {total, ok_count, diamonds} = result;
            console.log(`total diamonds: ${total}`);
            console.log(`passed count: ${ok_count}`);

            const diamonds_passed = [];
            const diamonds_errors = [];
            for (const diamond of diamonds) {

                const {row_no, pass, vendor_sku, certificate_lab, certificate_number, errors} = diamond;

                if (errors) {
                    for (const error of errors) {
                        diamonds_errors.push({row_no, vendor_sku, certificate_lab, certificate_number, error})
                    }
                }
                if (pass) {
                    diamonds_passed.push(diamond);
                }
            }

            const passed_fields = ['row_no', ...std_fields.map(x => x.key)];
            write_to_csv(node_path.join(__dirname, 'diamonds-passed.csv'), diamonds_passed, passed_fields);

            const errors_fields = ['row_no', 'vendor_sku', 'certificate_lab', 'certificate_number', 'error']
            write_to_csv(node_path.join(__dirname, 'diamonds-errors.csv'), diamonds_errors, errors_fields);

            console.log('check ./diamonds-passed.csv for passed diamonds');
            console.log('check ./diamonds-errors.csv for errors');

        } else {
            console.error('failed to parse inventory csv', local_filepath);
        }
    } catch (err) {
        console.error(err.message);
    }
})();