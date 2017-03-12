console.log('The app is starting...');
// dependencies; npm install ...
const fs = require('fs');
const Promise = require('bluebird');
const Twit = require('twit');
// api-keys.js with twitter API keys from https://dev.twitter.com/
// (requires a verified account and phone number)
const config = require('./api-keys');

Promise.promisifyAll(fs);

const T = new Twit(config);
Promise.promisifyAll(T);

console.log('Fetching tweets...');

// GET request rate limits @ 180 calls per 15 minutes, see: https://dev.twitter.com/rest/public/rate-limiting
function getTweets(q) {
  return T.get('search/tweets', { q, count: 100 })
    .then(res => res.data.statuses)
    .then(data => data.map(e => `${e.id_str},${e.text},${e.created_at}`))
    .then(e => fs.writeFile('testing.csv', JSON.stringify(e, null, 4)));
}

getTweets('Thiomersal'); // search term here.
console.log('Tweets written to file!');
