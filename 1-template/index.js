'use strict';

const { mk_template } = require('@samwen/vendor-sdk');

(async () => {
    try {
        await mk_template(__dirname);
    } catch(err) {
        console.log(err.message);
    }
})();