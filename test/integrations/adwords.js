
describe('AdWords', function(){

  var AdWords = require('integrations/lib/adwords');
  var test = require('integration-tester');
  var analytics = require('analytics');
  var assert = require('assert');
  var sinon = require('sinon');

  var settings = {
    conversionId: 978352801,
    events: {
      signup: '-kGkCJ_TsgcQofXB0gM',
      login: 'QbThCM_zogcQofXB0gM',
      play: 'b91fc77f'
    }
  };

  beforeEach(function(){
    analytics.use(AdWords);
    adwords = new AdWords.Integration(settings);
  })

  it('should have the correct settings', function(){
    test(adwords)
      .name('AdWords')
      .readyOnLoad()
      .option('events', {});
  })

  describe('#load', function(){
    it('should load', function(done){
      adwords.load(function(){ done(); });
    })
  })

  describe('#conversion', function(){
    beforeEach(function(){
      var els = document.getElementsByTagName('img');
      for (var i = 0; i < els.length; ++i) {
        if (!els[i].src) continue;
        if (/googleadservices/.test(els[i].src)) continue;
        els[i].parentNode.removeChild(els[i]);
      }
    })

    it('should set globals correctly', function(done){
      adwords.conversion({ conversionId: 1, label: 'baz', value: 9 }, done);
      assert(1 == window.google_conversion_id);
      assert('en' == window.google_conversion_language);
      assert('3' == window.google_conversion_format);
      assert('ffffff' == window.google_conversion_color);
      assert('baz' == window.google_conversion_label);
      assert(9 == window.google_conversion_value);
      assert(false == window.google_remarketing_only);
    })

    it('should override document.write', function(done){
      var write = document.write;
      adwords.conversion({ conversionId: 1, label: 'baz', value: 9 }, done);
      assert(write != document.write);
    });

    it('should restore document.write', function(done){
      var write = document.write;
      adwords.conversion({ conversionId: 1, label: 'baz', value: 9 }, function(){
        assert(write == document.write);
        done();
      });
    })
  })

  describe('#track', function(){
    beforeEach(function(done){
      adwords.on('ready', done);
      sinon.spy(adwords, 'conversion');
      adwords.initialize();
    })

    it('should not send if event is not defined', function(){
      test(adwords).track('toString', {});
      assert(!adwords.conversion.called);
    })

    it('should send event if its defined', function(){
      test(adwords).track('signup', {});
      assert(adwords.conversion.calledWith({
        conversionId: adwords.options.conversionId,
        label: adwords.options.events.signup,
        value: 0,
      }))
    })

    it('should support arrayed .events', function(){
      adwords.options.events = [{ key: 'event', value: '7d2374dc' }];
      test(adwords).track('event', { revenue: 100 });
      assert(adwords.conversion.calledWith({
        conversionId: 978352801,
        label: '7d2374dc',
        value: 100
      }));
    })

    it('should be able to send multiple events', function(){
      adwords.options.events = [{ key: 'event', value: 'one'}, { key: 'event', value: 'two' }];
      test(adwords).track('event', { revenue: 100 });
      var args = adwords.conversion.args;
      assert(adwords.conversion.calledTwice);

      // one
      assert.deepEqual(args[0][0], {
        conversionId: 978352801,
        label: 'one',
        value: 100
      });

      // two
      assert.deepEqual(args[1][0], {
        conversionId: 978352801,
        label: 'two',
        value: 100
      });
    })

    it('should send revenue', function(){
      test(adwords).track('login', { revenue: 90 });
      assert(adwords.conversion.calledWith({
        conversionId: adwords.options.conversionId,
        label: adwords.options.events.login,
        value: 90
      }));
    })
  })
})
