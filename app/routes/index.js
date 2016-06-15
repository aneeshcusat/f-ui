'use strict';

module.exports = function(app) {
    // Root routing
    var index = require('../../app/controllers/index');
    app.get('/', index.index);
};
