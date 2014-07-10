
/**
 * Module dependencies.
 */

var integration = require('segmentio/analytics.js-integration@add/tags');

/**
 * Expose plugin
 */

module.exports = exports = function(analytics){
  analytics.addIntegration(WebEngage);
};

/**
 * Expose `WebEngage` integration
 */

var WebEngage = exports.Integration = integration('WebEngage')
  .assumesPageview()
  .global('_weq')
  .global('webengage')
  .option('widgetVersion', '4.0')
  .option('licenseCode', '')
  .tag('http', '<script src="http://cdn.widgets.webengage.com/js/widget/webengage-min-v-4.0.js">')
  .tag('https', '<script src="https://ssl.widgets.webengage.com/js/widget/webengage-min-v-4.0.js">');

/**
 * Initialize.
 *
 * @param {Object} page
 */

WebEngage.prototype.initialize = function(page){
  var _weq = window._weq = window._weq || {};
  _weq['webengage.licenseCode'] = this.options.licenseCode;
  _weq['webengage.widgetVersion'] = this.options.widgetVersion;
  this.load(window.location.protocol.replace(':', ''), this.ready);
};

/**
 * Loaded?
 *
 * @return {Boolean}
 */

WebEngage.prototype.loaded = function(){
  return !! window.webengage;
};
