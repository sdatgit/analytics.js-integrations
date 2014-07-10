
/**
 * Module dependencies.
 */

var integration = require('segmentio/analytics.js-integration@add/tags');
var is = require('is');
var extend = require('extend');
var onError = require('on-error');

/**
 * Expose plugin.
 */

module.exports = exports = function(analytics){
  analytics.addIntegration(Bugsnag);
};

/**
 * Expose `Bugsnag` integration.
 */

var Bugsnag = exports.Integration = integration('Bugsnag')
  .global('Bugsnag')
  .option('apiKey', '')
  .tag('<script src="//d2wy8f7a9ursnm.cloudfront.net/bugsnag-2.min.js">');

/**
 * Initialize.
 *
 * https://bugsnag.com/docs/notifiers/js
 *
 * @param {Object} page
 */

Bugsnag.prototype.initialize = function(page){
  var self = this;
  this.load(function(){
    window.Bugsnag.apiKey = self.options.apiKey;
    self.ready();
  });
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

Bugsnag.prototype.loaded = function(){
  return is.object(window.Bugsnag);
};

/**
 * Identify.
 *
 * @param {Identify} identify
 */

Bugsnag.prototype.identify = function(identify){
  window.Bugsnag.metaData = window.Bugsnag.metaData || {};
  extend(window.Bugsnag.metaData, identify.traits());
};
