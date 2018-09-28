/**
 * Module dependencies.
 */
var Strategy = require('./strategy');
/**
 * Expose `Strategy` directly from package.
 */
exports = module.exports = Strategy;

/**
 * Export constructors.
 */
exports.Strategy = Strategy;

var TokenAuth = require('./tokenAuth');
exports.TokenAuth = TokenAuth;