import { MessageEmbed } from "discord.js";

const sendReg = (charaterInfo, messageContent) => {
    let registerMessage = new MessageEmbed()
        .setColor(charaterInfo.emColor)
        .setAuthor({
            name: charaterInfo.name,
            iconURL: charaterInfo.iconURL,
            url: charaterInfo.url
        })
        .setImage(charaterInfo.image)
        .setTimestamp();
    
    for (let i = 0; i < messageContent.length; i++) {
        registerMessage.addFields(messageContent[i]);
    }

    return registerMessage;
}

export default sendReg