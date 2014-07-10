
/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');
var push = require('global-queue')('_fbq');
var load = require('load-script');
var each = require('each');

/**
 * Expose plugin
 */

module.exports = exports = function(analytics){
  analytics.addIntegration(Facebook);
};

/**
 * HOP
 */

var has = Object.prototype.hasOwnProperty;

/**
 * Expose `Facebook`
 */

var Facebook = exports.Integration = integration('Facebook Ads')
  .readyOnInitialize()
  .global('_fbq')
  .option('currency', 'USD')
  .mapping('events');

/**
 * Initialize Facebook Ads.
 *
 * https://developers.facebook.com/docs/ads-for-websites/conversion-pixel-code-migration
 *
 * @param {Object} page
 */

Facebook.prototype.initialize = function(page){
  window._fbq = window._fbq || [];
  this.load();
};

/**
 * Load the Facebook Ads library.
 *
 * @param {Function} fn
 */

Facebook.prototype.load = function(fn){
  load('//connect.facebook.net/en_US/fbds.js', fn);
  window._fbq.loaded = true;
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

Facebook.prototype.loaded = function(){
  return !! (window._fbq && window._fbq.loaded);
};

/**
 * Track.
 *
 * https://developers.facebook.com/docs/reference/ads-api/custom-audience-website-faq/#fbpixel
 *
 * @param {Track} track
 */

Facebook.prototype.track = function(track){
  var event = track.event();
  var events = this.events(event);
  var traits = track.traits();
  var revenue = track.revenue() || 0;
  var self = this;

  each(events, function(event){
    push('track', event, {
      value: String(revenue.toFixed(2)),
      currency: self.options.currency
    });
  });

  if (!events.length) {
    var data = track.properties();
    push('track', event, data);
  }
};
