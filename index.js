const axios = require('axios');
require('dotenv').config()

const TelegramBot = require('node-telegram-bot-api');

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_TOKEN;

const TELEGRAM_CHAT_ID = process.env.TELEGRAM_ID;

const SERVER_URL = 'http://127.0.0.1:5000/api/test';

const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: false });

async function checkServerStatus() {
  try {
    await axios.get(SERVER_URL);
    console.log('Server is running');
  } catch (error) {
    console.error('Server is not running');

    await bot.sendMessage(TELEGRAM_CHAT_ID, 'The checker server is not running!');
  }
}

setInterval(checkServerStatus, 1 * 60 * 1000);