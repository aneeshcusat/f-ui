var convict = require('convict');

// define a schema 

var conf = convict({
    env: {
        doc: "The applicaton environment.",
        format: ["production", "development", "test"],
        default: "development",
        env: "NODE_ENV"
    },
    nodeHostIP: {
        doc: "The IP address to bind.",
        format: "ipaddress",
        default: "127.0.0.1",
        env: "NODEIP_ADDRESS",
    },
    webserviceHostIP: {
        doc: "The IP address to bind.",
        format: "ipaddress",
        default: "127.0.0.1",
        env: "WSIP_ADDRESS",
    },
    nodePort: {
        doc: "The port to bind.",
        format: "port",
        default: 80,
        env: "NODEPORT"
    },
    nodeSecurePort: {
        doc: "The secure port to bind.",
        format: "port",
        default: 443,
        env: "NODEPORTSECURE"
    },
    webservicePort: {
        doc: "The port to bind.",
        format: "port",
        default: 0,
        env: "WSPORT"
    },
    protocol: {
        doc: "The protocol to bind.",
        format: ["http", "https"],
        default: "http"
    }
});


// load environment dependent configuration 

var env = conf.get('env');
conf.loadFile('./config/env/' + env + '.json');

// perform validation 

conf.validate();

module.exports = conf;
