'use strict';

const { api_update_fields_map } = require('@samwen/vendor-sdk');

const fields_map = require('./fields-map');

(async () => {

    try {
        const result = await api_update_fields_map(fields_map);
        
        console.log(JSON.stringify(result, null, 2));
    } catch (err) {
        console.error(err.message);
    }
    
})();