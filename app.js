import { Client, Intents, MessageEmbed, Collection } from 'discord.js';
import sendReg from './embedMsg/sendReg.js'
import dotenv from 'dotenv';
import characters from './characters/characters.js'

dotenv.config();

const prefix = "$"

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

let slashCommands = [
    {
        name: "ping",
        description: "Devuelve el ping de el bot",
        run: async (client, interaction) => {
            await interaction.followUp({ content: `Ping: ${client.ws.ping} ms` });
        },
    },
    {
        name: "hola",
        description: "Devuelve un saludo",
        run: async (client, interaction) => {
            await interaction.followUp({ content: "Hola como estas?" });
        },
    },
];

client.slash = new Collection();

// codigo
client.once('ready', async (bot) => {
    console.log(
        `Bot: ${bot.user.username} \n Status: ${bot.presence.status}`
    );

    client.user.setStatus('online');
    client.user.setActivity('Quiet Council', { type: "WATCHING" });

    client.slash.set(slashCommands[0].name, slashCommands[0]);
    client.slash.set(slashCommands[1].name, slashCommands[1]);

    await client.application.commands.set(slashCommands)

});



client.login(process.env.DISCORD_TOKEN);

// first Embed Message
// Embed Message
const me = new MessageEmbed()
    .setColor([0, 255, 255])
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
            value: "Emma welcomes you to Krakoa"
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



// https://ouroboros.world/sites/default/files/inline-images/IMG_20191002_100040.jpg

client.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand()) {
        await interaction.deferReply({ ephemeral: false }).catch((obj) => {
            console.log(obj)
        });

        console.log(client.slash.get(interaction.commandName));

        const command = client.slash.get(interaction.commandName);

        if (!command) {
            return interaction.followUp({ content: "Comando no registrado" });
        }

        const args = [];

        try {
            command.run(client, interaction, args);
        } catch (error) {
            console.log(error)
        }

    }
})

// captar mensaje
client.on("messageCreate", (msg) => {

    if (msg.author.bot) {
        return console.log(`Mensaje de ${msg.author.username}`);
    }

    if (msg.content.startsWith(prefix)) {
        const argumentos = msg.content.slice(prefix.length).split(/ +/);

        const comando = argumentos.shift().toLowerCase();

        if (comando == "welcome") return msg.reply({ embeds: [me] });

        if (msg.channel.name == "quiet-council") {

            if (comando == "reg") {
                let messageFields =
                    [{
                        name: "Registration",
                        value: "Welcome to the Quiet Council, my name is Charles Xavier"
                    }]

                let messageE = sendReg(characters.charles_xavier, messageFields);
                msg.channel.send({ embeds: [messageE] });

            }

        }

        if (msg.channel.name == "hellfire-trading-company") {

            if (comando == "reg") {
                let messageFields =
                    [{
                        name: "Registration",
                        value: "Welcome to the Hellfire Trading Company, my name is Emma Frost"
                    }]

                let messageE = sendReg(characters.emma_frost, messageFields);
                msg.channel.send({ embeds: [messageE] });

            }

        }

    }

})

