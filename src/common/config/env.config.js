const dev = require('./dev.config');
const prod = require('./prod.config');
const ENV = process.env.GRDAI_ENV;

let config = ENV == "production" ? prod : dev;

module.exports = config;