// jscs:disable disallowQuotedKeysInObjects

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
        /*
         * The following dictionary is auto-generated by `1.py`.
         * Update it as required (based on the testing profile associated with
         * the web service).
         */
        window.colligso.configure({
          'add1': '...add1...',
          'add2': '...add2...',
          'amount': '...amount...',
          'appBuild': '...appBuild...',
          'appName': '...appName...',
          'appVersion': '...appVersion...',
          'campaignId': '...campaignId...',
          'cartId': '...cartId...',
          'city': '...city...',
          'code': '...code...',
          'country': '...country...',
          'currency': '...currency...',
          'domain': '...domain...',
          'dwellTime': '...dwellTime...',
          'email': '...email...',
          'firstName': '...firstName...',
          'fullName': '...fullName...',
          'gender': '...gender...',
          'itemName': '...itemName...',
          'lastName': '...lastName...',
          'middleName': '...middleName...',
          'mobile': '...mobile...',
          'pageTitle': '...pageTitle...',
          'pcode': '...pcode...',
          'phone': '...phone...',
          'points': '...points...',
          'price': '...price...',
          'profileUrl': '...profileUrl...',
          'quantity': '...quantity...',
          'query': '...query...',
          'screenName': '...screenName...',
          'sku': '...sku...',
          'socialWeb': '...socialWeb...',
          'state': '...state...',
          'tObjectId': '...tObjectId...',
          'tObjectProvider': '...tObjectProvider...',
          'tObjectType': '...tObjectType...',
          'txId': '...txId...',
          'userId': '...userId...',
          'userName': '...userName...',
          'userProvider': '...userProvider...',
          'vendor': '...vendor...'
        });
      });

      /*
       * The following dictionary is auto-generated by `1.py`.
       * DO NOT MODIFY.
       */
      var categories = {
        'account': {
          'login': [
            24,
            35
          ],
          'logout': [
            24,
            41
          ],
          'register': [
            29,
            47
          ],
          'unregister': [
            24,
            40
          ],
          'update': [
            24,
            49
          ]
        },
        'commerce': {
          'addcart': [
            29,
            47
          ],
          'buy': [
            39,
            58
          ],
          'checkin': [
            24,
            48
          ],
          'claim': [
            29,
            54
          ],
          'redeem': [
            27,
            54
          ],
          'removecart': [
            29,
            47
          ],
          'reserve': [
            29,
            57
          ],
          'return': [
            38,
            57
          ]
        },
        'proximity': {
          'arrival': [
            24,
            47
          ],
          'departure': [
            24,
            47
          ],
          'sighting': [
            24,
            47
          ],
          'visit': [
            25,
            48
          ]
        },
        'search': {
          'scan': [
            22,
            45
          ],
          'search': [
            22,
            45
          ]
        },
        'social': {
          'comment': [
            29,
            46
          ],
          'favorite': [
            29,
            46
          ],
          'like': [
            29,
            46
          ],
          'pin': [
            28,
            45
          ],
          'plus1': [
            29,
            46
          ],
          'post': [
            28,
            45
          ],
          'retweet': [
            29,
            46
          ],
          'share': [
            28,
            45
          ],
          'tweet': [
            28,
            45
          ]
        },
        'tracking': {
          'appview': [
            22,
            38
          ],
          'audiopause': [
            24,
            43
          ],
          'audioplay': [
            24,
            43
          ],
          'download': [
            25,
            44
          ],
          'itemview': [
            27,
            46
          ],
          'pageview': [
            24,
            46
          ],
          'screenview': [
            24,
            42
          ],
          'videopause': [
            24,
            43
          ],
          'videoplay': [
            24,
            43
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