
/**
 * Module dependencies.
 */

var integration = require('segmentio/analytics.js-integration@add/tags');
var useHttps = require('use-https');

/**
 * Expose plugin.
 */

module.exports = exports = function(analytics){
  analytics.addIntegration(Comscore);
};

/**
 * Expose `Comscore` integration.
 */

var Comscore = exports.Integration = integration('comScore')
  .assumesPageview()
  .global('_comscore')
  .global('COMSCORE')
  .option('c1', '2')
  .option('c2', '')
  .tag('http', '<script src="http://b.scorecardresearch.com/beacon.js">')
  .tag('https', '<script src="https://sb.scorecardresearch.com/beacon.js">');

/**
 * Initialize.
 *
 * @param {Object} page
 */

Comscore.prototype.initialize = function(page){
  window._comscore = window._comscore || [this.options];
  var name = useHttps() ? 'https' : 'http';
  this.load(name, this.ready);
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

Comscore.prototype.loaded = function(){
  return !! window.COMSCORE;
};