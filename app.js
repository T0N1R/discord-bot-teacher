const {Client, Intents} = require("discord.js");
require("dotenv").config();

const client = new Client({intents:[Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

// codigo
client.once('ready', (bot) => {
    console.log(`Bot: ${bot.user.username}\nStatus: ${bot.presence.status}`);
});

client.login(process.env.DISCORD_TOKEN);