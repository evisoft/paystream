'use strict';

angular.module('streamium.rates', [])

.service('Rates', function($http) {
  
  function RateService () {
    this.rate = 0;

    var self = this;
    $http.get('https://bitpay.com/api/rates/usd').success(function(data) {
      self.rate = data.rate;
    });
  };

  return new RateService();
})

.filter('USD2BTC', function(Rates, bitcore) {
  return function(usd) {
    if (!Rates.rate) return '0 BTC';
    return bitcore.Unit.fromFiat(usd, Rates.rate).toBTC() + ' BTC';
  };
})

.filter('BTC2USD', function(Rates, bitcore) {
  return function(btc) {
    if (!Rates.rate) return '0 USD';
    return bitcore.Unit.fromBTC(btc).atRate(Rates.rate) + ' USD';
  };
});
