
/**
 * Module dependencies.
 */

var pixel = require('load-pixel')('//analytics.twitter.com/i/adsct');
var integration = require('integration');
var each = require('each');

/**
 * Expose plugin
 */

module.exports = exports = function(analytics){
  analytics.addIntegration(TwitterAds);
};

/**
 * Expose `load`
 */

exports.load = pixel;

/**
 * HOP
 */

var has = Object.prototype.hasOwnProperty;

/**
 * Expose `TwitterAds`
 */

var TwitterAds = exports.Integration = integration('Twitter Ads')
  .readyOnInitialize()
  .option('events', {});

/**
 * Track.
 *
 * @param {Track} track
 */

TwitterAds.prototype.track = function(track){
  var events = this.events(track.event());
  each(events, function(event){
    exports.load({
      txn_id: event,
      p_id: 'Twitter'
    });
  });
};
