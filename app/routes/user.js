'use strict';

module.exports = function(app) {
    // Root routing
    var user = require('../../app/controllers/user');
    app.get('/getuser', user.getuser);
};
