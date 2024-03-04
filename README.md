Crypto Bot Readme
This repository contains a Telegram bot designed to provide cryptocurrency enthusiasts with real-time information about the Bitcoin price and the Fear and Greed Index. The bot is equipped with features to deliver alerts and updates to Telegram users.

Installation
Clone the repository to your local machine:

bash
Copy code
git clone [https://github.com/your_username/your_repo.git](https://github.com/kartikeyarai7/CryptoBot.git)
Install the required dependencies:

bash
Copy code
npm install
Obtain API keys:

CoinAPI: Obtain a key by registering at CoinAPI.
Replace placeholder values:

Replace key_here with your CoinAPI key.
Replace bot_token with your Telegram bot token.
Usage
Set Up Your Telegram Bot
Create a new bot on Telegram and obtain the API token.

Replace BOT_TOKEN with your Telegram bot token.

Replace YOUR_CHAT_ID with your Telegram chat ID in the chatId variable.

Schedule Tasks
The bot is scheduled to run tasks using the node-cron library. Adjust the schedule based on your preferences.
javascript
Copy code
// Schedule the task to run at 1:10 AM every day
let task = cron.schedule('0 10 1 \* \* \*', () => {
console.log('Running');
checkBitcoinPrice();
scrapeData();
});

task.start();
Custom Messages
Customize the welcome message or any other responses by modifying the appropriate sections of the code.
javascript
Copy code
// Listen for incoming messages and respond with a welcome message
bot.on('message', msg => {
const chatId = msg.chat.id;
bot.sendMessage(chatId, '👋 Welcome to the Crypto bot! You will receive... [Your Custom Message]');
});
Features
Bitcoin Price Alert:

Receive alerts when the Bitcoin price falls below $20,000.
Fear and Greed Index:

Daily updates on the Fear and Greed Index, indicating market sentiment.
Customizable Schedule:

Easily adjust the schedule for running tasks according to your preferences.
Informative Welcome Message:
A welcome message introduces users to the bot's functionalities and purpose.

Testing Mode
The bot is currently in testing mode, developed based on suggestions to provide regular updates to the group. Please provide feedback for further improvements.
Feel free to explore and enhance the functionality of the bot as needed. Happy coding! 🚀🌕
