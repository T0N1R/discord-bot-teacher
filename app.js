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

    if (msg.author.bot) {
        return console.log(`Mensaje de ${msg.author.username}`);
    } 
    
    if (msg.content.startsWith(prefix)) {
        const argumentos = msg.content.slice(prefix.length).split(/ +/);
        
        const comando = argumentos.shift().toLowerCase();

        if (comando == "ping") return msg.reply("pong");

    }

})

