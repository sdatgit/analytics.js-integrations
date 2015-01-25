
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

      var categories = {
        account: {
          login: [
            19,
            29
          ],
          logout: [
            19,
            35
          ],
          register: [
            24,
            41
          ],
          unregister: [
            19,
            34
          ],
          update: [
            19,
            43
          ]
        },
        commerce: {
          addcart: [
            23,
            40
          ],
          buy: [
            33,
            52
          ],
          checkin: [
            19,
            42
          ],
          claim: [
            25,
            48
          ],
          redeem: [
            23,
            48
          ],
          removecart: [
            23,
            40
          ],
          reserve: [
            23,
            50
          ],
          'return': [
            32,
            51
          ]
        },
        proximity: {
          arrival: [
            19,
            41
          ],
          departure: [
            19,
            41
          ],
          sighting: [
            19,
            41
          ],
          visit: [
            20,
            42
          ]
        },
        search: {
          scan: [
            17,
            38
          ],
          search: [
            17,
            37
          ]
        },
        social: {
          comment: [
            24,
            39
          ],
          favorite: [
            24,
            39
          ],
          like: [
            24,
            39
          ],
          pin: [
            23,
            38
          ],
          plus1: [
            24,
            39
          ],
          post: [
            23,
            38
          ],
          retweet: [
            24,
            39
          ],
          share: [
            23,
            38
          ],
          tweet: [
            23,
            38
          ]
        },
        tracking: {
          appview: [
            18,
            33
          ],
          audiopause: [
            19,
            36
          ],
          audioplay: [
            19,
            36
          ],
          download: [
            20,
            37
          ],
          itemview: [
            22,
            39
          ],
          pageview: [
            20,
            38
          ],
          videopause: [
            19,
            36
          ],
          videoplay: [
            19,
            36
          ]
        }
      };
      for (category in categories){
        for (event in categories[category]){
          it(
            'should send a'
            +
            ' '
            +
            event
            +
            ' '
            +
            'event with at least'
            +
            ' '
            +
            categories[category][event][0]
            +
            ' '
            +
            'properties and at most'
            +
            ' '
            +
            categories[category][event][1]
            +
            ' '
            +
            'properties',
            function(){
              analytics.track('checkin');
              analytics.called(window.colligso.post, 'checkin');
            }
          );
        }
      }
    });
  });
});
