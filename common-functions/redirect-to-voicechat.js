
const redirect_voicechat_all = (interaction, destination, users_id) => {
    for (let index = 0; index < users_id.length; index++) {
        interaction.guild.members.cache.get(users_id[index]).voice.setChannel(destination);
    }

    interaction.reply("cambio al canal")
}

export default redirect_voicechat_all;