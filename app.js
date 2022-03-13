const {Client, Intents, MessageEmbed} = require("discord.js");
require("dotenv").config();

const prefix = "$"

const client = new Client({intents:[Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

// codigo
client.once('ready', (bot) => {
    console.log(`Bot: ${bot.user.username}\nStatus: ${bot.presence.status}`);
});

client.login(process.env.DISCORD_TOKEN);

// Embed Message
const me = new MessageEmbed()
    .setColor([0,255,255])
    .setTitle("Welcome")
    .setURL("https://youtu.be/wd2mV4KkAG4")
    .setAuthor({ 
        name: 'Emma Frost', 
        iconURL: 'https://insidepulse.com/wp-content/uploads/2019/05/House-of-X-Powers-Of-X-X-Men-logo-symbol-e1558148793647.jpg',
        url: "https://marvel.fandom.com/wiki/Emma_Frost_(Earth-616)?so=search"
    }
    )
    .setDescription("Descripción del Embed Message")
    .setThumbnail("https://geekd-out.com/wp-content/uploads/2021/10/inferno-2-feat.jpeg")
    .addFields(
        {
            name: "Powers", 
            value:"Emma welcomes you to Krakoa"
        },
        {
            name: "Col 1",
            value: "Columna 1 descripcion",
            inline: true
        },
        {
            name: "Col 2",
            value: "Columna 2 descripcion",
            inline: true
        }
    )
    .setImage("https://cdn.vox-cdn.com/thumbor/5nAYzWf54TdyHPX3xQo7Ygbf1lY=/1400x0/filters:no_upscale()/cdn.vox-cdn.com/uploads/chorus_asset/file/22889116/white_queen_inferno.jpg")
    .setTimestamp()
    .setFooter({
        text: "Emma Frost", 
        iconURL: "https://geekd-out.com/wp-content/uploads/2021/10/inferno-2-feat.jpeg"
    })


// captar mensaje
client.on("messageCreate", (msg) => {

    if (msg.author.bot) {
        return console.log(`Mensaje de ${msg.author.username}`);
    } 
    
    if (msg.content.startsWith(prefix)) {
        const argumentos = msg.content.slice(prefix.length).split(/ +/);
        
        const comando = argumentos.shift().toLowerCase();

        const me2 = new MessageEmbed()
            .setColor([138,50,252])
            .setTitle(comando)
            .setAuthor({
                name: msg.author.username, 
                iconURL: msg.author.displayAvatarURL(),
            })
            .setDescription(`El comando elegido es ${comando}`);

        msg.channel.send({embeds: [me2] })

        if (comando == "welcome") return msg.reply({embeds: [me]});

    }

})

