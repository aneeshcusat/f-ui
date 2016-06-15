'use strict';

var config = require('./config');
var host = config.get('protocol') + "://" + config.get('webserviceHostIP') + ":" + config.get('webservicePort') + '/';

var env = config.get('env');

var nodehost = config.get('protocol') + "://" + config.get('nodeHostIP') + ":" + config.get('nodePort') + '/';

module.exports = {
    imagehost: function(image) {
        return host + image;
    },
    nodedomain: function(asset) {
        return nodehost + asset;
    },
    formatCurrency: function(value) {
        return parseFloat(value).toFixed(2);
    },
    getHttpLink: function(path) {
        return 'http://' + config.get('nodeHostIP') + ":" + config.get('nodePort') + path;
    },
    getHttpsLink: function(path) {
        return 'https://' + config.get('nodeHostIP') + ":" + config.get('nodeSecurePort') + path;
    }
};
