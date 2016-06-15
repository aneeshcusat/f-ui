'use strict';

var config = require('./config');

var host = config.get('protocol') + "://" + config.get('webserviceHostIP') + ":" + config.get('webservicePort');

var configUrls = {
    getuser: host + "/fstack/rest/user/getuser"
}

module.exports = configUrls;
