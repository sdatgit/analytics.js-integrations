
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
  .tag('<script src="//127.0.0.1:5000/resources/vendor/wavejs/colligso.js">');

/**
 * Initialize Colligso.
 *
 * @param {Object} page
 */

Colligso.prototype.initialize = function(page){
  var self = this;
  this.load(function(){
    window.colligso.configure({
      add1: '...add1...',
      add2: '...add2...',
      amount: '...amount...',
      cartId: '...cartId...',
      city: '...city...',
      code: '...code...',
      country: '...country...',
      currency: '...currency...',
      domain: '...domain...',
      email: '...email...',
      firstName: '...firstName...',
      fullName: '...fullName...',
      gender: '...gender...',
      itemCategory: '...itemCategory...',
      itemName: '...itemName...',
      lastName: '...lastName...',
      middleName: '...middleName...',
      mobile: '...mobile...',
      offerId: '...offerId...',
      pcode: '...pcode...',
      phone: '...phone...',
      points: '...points...',
      price: '...price...',
      profileUrl: '...profileUrl...',
      quantity: '...quantity...',
      query: '...query...',
      sku: '...sku...',
      socialWeb: '...socialWeb...',
      state: '...state...',
      tObjectId: '...tObjectId...',
      tObjectProvider: '...tObjectProvider...',
      tObjectType: '...tObjectType...',
      temp: '...temp...',
      txId: '...txId...',
      userId: '...userId...',
      userName: '...userName...',
      userProvider: '...userProvider...',
      vendor: '...vendor...'
    });
    self.ready();
  });
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
  window.colligso.post(
    track.event(),
    track.properties(),
    function(xhr){
      if (xhr.target.status == 200) {
        window.console && window.console.log && window.console.log(
          'Success'
        );
      } else {
        window.console && window.console.log && window.console.log(
          'Failure #2'
        );
      }
    },
    function(){
      window.console && window.console.log && window.console.log(
        'Failure #1'
      );
    }
  );
};
