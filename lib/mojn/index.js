
/**
 * Module dependencies.
 */

var integration = require('segmentio/analytics.js-integration@add/tags');
var load = require('load-script');
var bind = require('bind');
var when = require('when');
var is = require('is');

/**
 * Expose plugin.
 */

module.exports = exports = function(analytics){
  analytics.addIntegration(Mojn);
};

/**
 * Expose `Mojn`
 */

var Mojn = exports.Integration = integration('Mojn')
  .option('customerCode', '')
  .global('_mojnTrack')
  .tag('<script src="https://track.idtargeting.com/{{ customerCode }}/track.js">');

/**
 * Initialize.
 *
 * @param {Object} page
 */

Mojn.prototype.initialize = function(){
  window._mojnTrack = window._mojnTrack || [];
  window._mojnTrack.push({ cid: this.options.customerCode });
  var loaded = bind(this, this.loaded);
  var ready = this.ready;
  this.load(function(){
    when(loaded, ready);
  });
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

Mojn.prototype.loaded = function(){
  return is.object(window._mojnTrack);
};

/**
 * Identify.
 *
 * @param {Identify} identify
 */

Mojn.prototype.identify = function(identify){
  var email = identify.email();
  if (!email) return;
  var img = new Image();
  img.src = '//matcher.idtargeting.com/analytics.gif?cid=' + this.options.customerCode + '&_mjnctid='+email;
  img.width = 1;
  img.height = 1;
  return img;
};

/**
 * Track.
 *
 * @param {Track} event
 */

Mojn.prototype.track = function(track){
  var properties = track.properties();
  var revenue = properties.revenue;
  var currency = properties.currency || '';
  var conv = currency + revenue;
  if (!revenue) return;
  window._mojnTrack.push({ conv: conv });
  return conv;
};
