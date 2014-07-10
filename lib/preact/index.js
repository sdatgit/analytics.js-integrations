
/**
 * Module dependencies.
 */

var integration = require('segmentio/analytics.js-integration@add/tags');
var convertDates = require('convert-dates');
var push = require('global-queue')('_lnq');
var callback = require('callback');
var load = require('load-script');
var alias = require('alias');

/**
 * Expose plugin.
 */

module.exports = exports = function(analytics){
  analytics.addIntegration(Preact);
};

/**
 * Expose `Preact` integration.
 */

var Preact = exports.Integration = integration('Preact')
  .assumesPageview()
  .global('_lnq')
  .option('projectCode', '')
  .tag('<script src="//d2bbvl6dq48fa6.cloudfront.net/js/ln-2.4.min.js">');

/**
 * Initialize.
 *
 * http://www.preact.io/api/javascript
 *
 * @param {Object} page
 */

Preact.prototype.initialize = function(page){
  window._lnq = window._lnq || [];
  push('_setCode', this.options.projectCode);
  this.load(this.ready);
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

Preact.prototype.loaded = function(){
  return !! (window._lnq && window._lnq.push !== Array.prototype.push);
};

/**
 * Identify.
 *
 * @param {Identify} identify
 */

Preact.prototype.identify = function(identify){
  if (!identify.userId()) return;
  var traits = identify.traits({ created: 'created_at' });
  traits = convertDates(traits, convertDate);
  push('_setPersonData', {
    name: identify.name(),
    email: identify.email(),
    uid: identify.userId(),
    properties: traits
  });
};

/**
 * Group.
 *
 * @param {String} id
 * @param {Object} properties (optional)
 * @param {Object} options (optional)
 */

Preact.prototype.group = function(group){
  if (!group.groupId()) return;
  push('_setAccount', group.traits());
};

/**
 * Track.
 *
 * @param {Track} track
 */

Preact.prototype.track = function(track){
  var props = track.properties();
  var revenue = track.revenue();
  var event = track.event();
  var special = { name: event };

  if (revenue) {
    special.revenue = revenue * 100;
    delete props.revenue;
  }

  if (props.note) {
    special.note = props.note;
    delete props.note;
  }

  push('_logEvent', special, props);
};

/**
 * Convert a `date` to a format Preact supports.
 *
 * @param {Date} date
 * @return {Number}
 */

function convertDate(date){
  return Math.floor(date / 1000);
}
