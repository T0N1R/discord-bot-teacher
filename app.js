const {Client, Intents} = require("discord.js");
require("dotenv").config();

const prefix = "$"

const client = new Client({intents:[Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

// codigo
client.once('ready', (bot) => {
    console.log(`Bot: ${bot.user.username}\nStatus: ${bot.presence.status}`);
});

client.login(process.env.DISCORD_TOKEN);

// captar mensaje
client.on("messageCreate", (msg) => {
    console.log(msg);

    if (msg.author.bot) {
        return console.log(`Mensaje de ${msg.author.username}`)
    } 
    
    if (msg.content.startsWith(prefix)) {
        return msg.reply("Hello, I'm Emma Frost")
    }

})

