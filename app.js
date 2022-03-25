import discord from 'discord.js';
import sendReg from './embedMsg/sendReg.js'
import dotenv from 'dotenv';
import characters from './characters/characters.js'
import welcomeMsg from './embedMsg/welcomeMsg.js';

dotenv.config();

const prefix = "$"

const client = new discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

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
    {
        name: "help",
        description: "Obtener información del servidor y de los comandos",
        run: async (client, interaction) => {
            console.log(client);
            await interaction.followUp({ embeds: [welcomeMsg] });
        },
    }
];

client.slash = new discord.Collection();

// codigo
client.once('ready', async (bot) => {
    console.log(
        `Bot: ${bot.user.username} \n Status: ${bot.presence.status}`
    );

    client.user.setStatus('online');
    client.user.setActivity('Quiet Council', { type: "WATCHING" });

    for (let index = 0; index < slashCommands.length; index++) {
        client.slash.set(slashCommands[index].name, slashCommands[index]);
    }

    await client.application.commands.set(slashCommands)

});


client.login(process.env.DISCORD_TOKEN);


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

        if (msg.channel.name == "quiet-council") {

            if (comando == "reg") {
                let messageFields =
                    [{
                        name: "Registration",
                        value: "Welcome to the Quiet Council, my name is Charles Xavier"
                    }]

                let messageE = sendReg(characters.charles_xavier, messageFields);
                msg.channel.reply({ embeds: [messageE] });

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

