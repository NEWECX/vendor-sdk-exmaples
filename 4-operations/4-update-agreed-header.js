'use strict';

const { api_update_header } = require('@samwen/vendor-sdk');

const agreed_header = require('./agreed-header');

(async () => {
    try {
        const result = await api_update_header(agreed_header);
        
        console.log(JSON.stringify(result, null, 2));
    } catch (err) {
        console.error(err.message);
    }
})();