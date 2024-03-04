const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const scrapeBitcoinFearAndGreedIndex = require('./data-scraping');
const cron = require('node-cron');

const COINAPI_KEY = 'key_here';

const BOT_TOKEN = 'bot_token';

// Create a new bot object with your Telegram bot token
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// Define the alert message and chat ID where you want to receive the alerts
const alertMessage = '⚠️ Alert: Bitcoin is below $20,000! Time to Buy';
const chatId = 978702662; // Replace YOUR_CHAT_ID with your Telegram chat ID
let fgiT = 0;
let fgiY = 0;
let fgiM = 0;

// Define the CoinAPI endpoint to get the latest Bitcoin price
const coinApiEndpoint = `https://rest.coinapi.io/v1/exchangerate/BTC/USD?apikey=${COINAPI_KEY}`;

// Define a function to check the Bitcoin price and send an alert if it's below $20,000
const checkBitcoinPrice = async () => {
  try {
    const response = await axios.get(coinApiEndpoint);
    const bitcoinPrice = response.data.rate;
    if (bitcoinPrice < 20000) {
      // console.log('Alert Activated')
      bot.sendMessage(chatId, alertMessage);
    }
  } catch (error) {
    console.error(error);
  }
};

// scrapeBitcoinFearAndGreedIndex().then(result => {
//   console.log('Bitcoin Fear and Greed Index:', result);
// });

const scrapeData = async () => {
  let res = await scrapeBitcoinFearAndGreedIndex();
  fgiT = res[0];
  fgiY = res[1];
  fgiM = res[2];
  const update = `According to the latest data, the Bitcoin fear and greed index for today is ${fgiT}, which is ${fgiT > fgiY ? '📈 higher' : '📉 lower'} than yesterday's value of ${fgiY}. This represents a ${fgiT < fgiY ? '👎 negative' : '👍 positive'} change in investor sentiment. Looking back to last month, the fear and greed index was ${fgiM}, which is ${fgiT > fgiM ? '📉 lower' : '📈 higher'} than today's value. Trade wisely! 🚀🌕
  `;
  bot.sendMessage(chatId, update);
};

// Schedule the task to run at 1:10 AM every day
let task = cron.schedule('0 0 * * *', () => {
  console.log('Running');
  checkBitcoinPrice();
  scrapeData();
});

task.start();

// Set an interval to check the Bitcoin price every minute
// setInterval(() => {
//   console.log('Running');
//   checkBitcoinPrice();
//   scrapeData();
// }, 1 * 1 * 6 * 1000);

// Listen for incoming messages and respond with a welcome message
bot.on('message', msg => {
  const chatId = msg.chat.id;
  console.log(chatId);

  //   console.log(chatId);
  bot.sendMessage(chatId, '👋 Welcome to the Crypto bot! You will receive 💰 price alerts and 📈📉 fear and greed index values every day for gauging the crypto market sentiment. 🤔 F&G Index is a number on a scale of 0-100. It combines various data points such as market volatility, trading volume, social media activity, surveys, and other indicators to gauge whether investors are feeling 😨 fearful or 💰 greedy about the market. A high score on the index indicates that investors are feeling greedy, while a low score indicates fear. 🚧 This bot is in testing mode currently and it has been developed on the suggestion by Ron to have regular updates in the group.');
});
