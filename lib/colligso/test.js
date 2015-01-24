
var Analytics = require('analytics.js').constructor;
var integration = require('analytics.js-integration');
var tester = require('analytics.js-integration-tester');
var plugin = require('./');
var sandbox = require('clear-env');

describe('Colligso', function(){
  var Colligso = plugin.Integration;
  var colligso;
  var analytics;
  var options = {};

  beforeEach(function(){
    analytics = new Analytics;
    colligso = new Colligso(options);
    analytics.use(plugin);
    analytics.use(tester);
    analytics.add(colligso);
  });

  afterEach(function(){
    analytics.restore();
    analytics.reset();
    colligso.reset();
    sandbox();
  });

  it('should have the right settings', function(){
    analytics.compare(
      Colligso,
      integration('Colligso').global('Colligso').global('colligso')
    );
  });

  describe('before loading', function(){
    describe('#load', function(){
      it('should call #load', function(){
        analytics.stub(colligso, 'load');
        analytics.initialize();
        analytics.called(colligso.load);
      });
    });
  });

  describe('loading', function(){
    it('should load', function(done){
      analytics.load(colligso, done);
    });
  });

  describe('after loading', function(){
    beforeEach(function(done){
      analytics.once('ready', done);
      analytics.initialize();
    });

    describe('#track', function(){
      beforeEach(function(){
        analytics.spy(window.colligso, 'post');
      });

      it('should send an event', function(){
        analytics.track('checkin');
        analytics.called(window.colligso.post, 'checkin');
      });

      it('should send an event and properties', function(){
        analytics.track('checkin', {
          property: true
        });
        analytics.called(window.colligso.post, 'checkin', {
          property: true
        });
      });
    });
  });
});
