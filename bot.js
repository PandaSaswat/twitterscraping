console.log('The bot is starting.');

var Twit = require('twit');
var fs = require('fs');
var config = require('./config');
// console.log(config);

var T = new Twit(config);

var params = {
    q: 'javascript',
    count: 10
};

T.get('search/tweets', params, gotData);

function gotData(err, data, response) {
  var tweets = data.statuses;
  var justText = [];
  for (var i = 0; i < tweets.length; i++)
    justText[i] = tweets[i].text + ',' + tweets[i].coordinates;
  console.log(justText);
  fs.writeFile('testing.csv', JSON.stringify(justText, null, 4));
  console.log('tweets written to file');
}
