
/**
 * Module dependencies.
 */

var integration = require('integration');
var load = require('load-script');
var each = require('each');
var is = require('is');

/**
 * User reference.
 */

var user;

/**
 * HOP
 */

var has = Object.prototype.hasOwnProperty;

/**
 * Expose plugin.
 */

module.exports = exports = function (analytics) {
  analytics.addIntegration(AdRoll);
  user = analytics.user(); // store for later
};

/**
 * Expose `AdRoll` integration.
 */

var AdRoll = exports.Integration = integration('AdRoll')
  .assumesPageview()
  .readyOnLoad()
  .global('__adroll_loaded')
  .global('adroll_adv_id')
  .global('adroll_pix_id')
  .global('adroll_custom_data')
  .option('events', {})
  .option('advId', '')
  .option('pixId', '');

/**
 * Initialize.
 *
 * http://support.adroll.com/getting-started-in-4-easy-steps/#step-one
 * http://support.adroll.com/enhanced-conversion-tracking/
 *
 * @param {Page} page
 */

AdRoll.prototype.initialize = function(page){
  window.adroll_adv_id = this.options.advId;
  window.adroll_pix_id = this.options.pixId;
  if (user.id()) window.adroll_custom_data = { USER_ID: user.id() };
  window.__adroll_loaded = true;
  this.load();
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

AdRoll.prototype.loaded = function(){
  return window.__adroll;
};

/**
 * Load the AdRoll library.
 *
 * @param {Function} callback
 */

AdRoll.prototype.load = function (callback) {
  load({
    http: 'http://a.adroll.com/j/roundtrip.js',
    https: 'https://s.adroll.com/j/roundtrip.js'
  }, callback);
};

/**
 * Track.
 * 
 * @param {Track} track
 */

AdRoll.prototype.track = function(track){
  var events = this.events(track.event());
  var total = track.revenue() || track.total() || 0;
  var orderId = track.orderId() || 0;
  var self = this;

  if (!events.length) events = [track.event()];

  each(events, function(event){
    self.debug('record user value: %s, segments: %s, orderId: %s', total, event, orderId);
    window.__adroll.record_user({
      adroll_conversion_value_in_dollars: total,
      adroll_segments: event,
      order_id: orderId
    });
  });
};
