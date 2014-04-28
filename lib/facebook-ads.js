
/**
 * Module dependencies.
 */

var load = require('load-pixel')('//www.facebook.com/offsite_event.php');
var integration = require('integration');
var each = require('each');

/**
 * Expose plugin
 */

module.exports = exports = function(analytics){
  analytics.addIntegration(Facebook);
};

/**
 * Expose `load`.
 */

exports.load = load;

/**
 * HOP
 */

var has = Object.prototype.hasOwnProperty;

/**
 * Expose `Facebook`
 */

var Facebook = exports.Integration = integration('Facebook Ads')
  .readyOnInitialize()
  .option('currency', 'USD')
  .option('events', {});

/**
 * Track.
 *
 * @param {Track} track
 */

Facebook.prototype.track = function(track){
  var events = this.events(track.event());
  var traits = track.traits();
  var self = this;

  each(events, function(event, i){
    exports.load({
      currency: self.options.currency,
      value: track.revenue() || 0,
      id: event
    });
  });
};
