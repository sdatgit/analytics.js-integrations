
/**
 * Module dependencies.
 */

var pixel = require('load-pixel')('//analytics.twitter.com/i/adsct');
var integration = require('analytics.js-integration');
var each = require('each');

/**
 * Expose plugin.
 */

module.exports = exports = function(analytics){
  analytics.addIntegration(TwitterAds);
};

/**
 * HOP.
 */

var has = Object.prototype.hasOwnProperty;

/**
 * Expose `TwitterAds`.
 */

var TwitterAds = exports.Integration = integration('Twitter Ads')
  .mapping('events')
  .readyOnLoad();

/**
 * Track.
 *
 * @param {Track} track
 */

TwitterAds.prototype.track = function(track){
  var events = this.events(track.event());
  var ret = [];

  each(events, function(event){
    ret.push(pixel({
      txn_id: event,
      p_id: 'Twitter'
    }));
  });

  return ret;
};
