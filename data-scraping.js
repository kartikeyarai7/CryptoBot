const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://alternative.me/crypto/fear-and-greed-index/';

const selectorToday = '#main > section > div > div.columns > div:nth-child(2) > div > div > div:nth-child(1) > div:nth-child(2) > div';
const selectorYes = '#main > section > div > div.columns > div:nth-child(2) > div > div > div:nth-child(2) > div:nth-child(2) > div';
const selectorLastMonth = '#main > section > div > div.columns > div:nth-child(2) > div > div > div.fng-value.last > div:nth-child(2) > div';

const scrapeBitcoinFearAndGreedIndex = async () => {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const bitcoinFearAndGreedIndexToday = $(selectorToday).text().trim();
    const bitcoinFearAndGreedIndexYes = $(selectorYes).text().trim();
    const bitcoinFearAndGreedIndexLastMonth = $(selectorLastMonth).text().trim();
    return [bitcoinFearAndGreedIndexToday, bitcoinFearAndGreedIndexYes, bitcoinFearAndGreedIndexLastMonth];
  } catch (error) {
    console.error(error);
  }
};

// Test the function
// scrapeBitcoinFearAndGreedIndex().then(result => {
//   console.log('Bitcoin Fear and Greed Index:', result);
// });

module.exports = scrapeBitcoinFearAndGreedIndex;

// Schedule the function to run every 24 hours
// setInterval(async () => {
//   const bitcoinFearAndGreedIndex = await scrapeBitcoinFearAndGreedIndex();
//   console.log('Bitcoin Fear and Greed Index:', bitcoinFearAndGreedIndex);
// }, 24 * 60 * 60 * 1000);
