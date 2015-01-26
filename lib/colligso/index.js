// jscs:disable disallowQuotedKeysInObjects

/**
 * Module dependencies.
 */

var integration = require('analytics.js-integration');

/**
 * Expose plugin.
 */

module.exports = exports = function(analytics){
  analytics.addIntegration(Colligso);
};

/**
 * Expose `Colligso` integration.
 */

var Colligso = exports.Integration = integration('Colligso')
  .global('Colligso')
  .global('colligso')
  /*
   * The following URL has to be changed before submitting the pull request to
   * segment.io. Ideally, it should point to the minified version of
   * colligso.js.
   */
  .tag('<script src="//127.0.0.1:5000/resources/vendor/wavejs/colligso.js">');

/**
 * Initialize Colligso.
 *
 * @param {Object} page
 */

Colligso.prototype.initialize = function(page){
  this.load(this.ready);
};

/**
 * Has the Colligso library been loaded yet?
 *
 * @return {Boolean}
 */

Colligso.prototype.loaded = function(){
  return !! window.colligso;
};

/**
 * Track an event.
 *
 * @param {Facade} track
 */

Colligso.prototype.track = function(track){
  /*
   * Arguments 3 and 4 are `onload` and `onerror` callbacks respectively.
   * Only use them for debugging purposes. They will ruin the output of
   * `make test` and `make test-browser`.
   */
  window.colligso.post(
    track.event(), track.properties(), function(){}, function(){}
  );
};
