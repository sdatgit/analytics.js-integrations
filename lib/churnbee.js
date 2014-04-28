
/**
 * Module dependencies.
 */

var push = require('global-queue')('_cbq');
var integration = require('integration');
var load = require('load-script');
var each = require('each');

/**
 * HOP
 */

var has = Object.prototype.hasOwnProperty;

/**
 * Supported events
 */

var supported = {
  activation: true,
  changePlan: true,
  register: true,
  refund: true,
  charge: true,
  cancel: true,
  login: true
};

/**
 * Expose plugin.
 */

module.exports = exports = function(analytics){
  analytics.addIntegration(ChurnBee);
};

/**
 * Expose `ChurnBee` integration.
 */

var ChurnBee = exports.Integration = integration('ChurnBee')
  .readyOnInitialize()
  .global('_cbq')
  .global('ChurnBee')
  .option('events', {})
  .option('apiKey', '');

/**
 * Initialize.
 *
 * https://churnbee.com/docs
 *
 * @param {Object} page
 */

ChurnBee.prototype.initialize = function(page){
  push('_setApiKey', this.options.apiKey);
  this.load();
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

ChurnBee.prototype.loaded = function(){
  return !! window.ChurnBee;
};

/**
 * Load the ChurnBee library.
 *
 * @param {Function} fn
 */

ChurnBee.prototype.load = function(fn){
  load('//api.churnbee.com/cb.js', fn);
};

/**
 * Track.
 *
 * @param {Track} event
 */

ChurnBee.prototype.track = function(track){
  var events = this.events(track.event());
  if (!events.length) events = [track.event()];
  each(events, function(event){
    if (true != supported[event]) return;
    push(event, track.properties({ revenue: 'amount' }));
  });
};
