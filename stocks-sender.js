var googleFinance = require('google-finance');
var logger = require('logzio-nodejs').createLogger({
    token: '{{YOUR_API_TOKEN}}'
});

var stocksList = [
    'NASDAQ:AAPL', 'NASDAQ:AMZN', 'NASDAQ:TSLA', 'NASDAQ:GOOG', 'NASDAQ:YHOO',
    'NYSE:TWTR', 'NASDAQ:FB', 'NASDAQ:ZNGA', 'NASDAQ:GRPN', 'NYSE:DIS', 'NASDAQ:CSCO',
    'NASDAQ:BIDU', 'NASDAQ:NFLX', 'NYSEMKT:APP'
];

var logStockData = function(i) {
    if (stocksList.length == i)
        return;

    var today = new Date();
    var yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    googleFinance.historical({
        symbol: stocksList[i],
        from: yesterday.getFullYear() + "-" + yesterday.getMonth() + "-" + yesterday.getDate(),
        to: today.getFullYear() + "-" + today.getMonth() + "-" + today.getDate()
    }, function(err, quote) {
        if (err) {
            logger.log(err);
            return logStockData(++i);
        }

        logger.log(quote);

        return logStockData(++i);
    });
};

logStockData(0);