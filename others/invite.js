const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "invite",
  aliases: ["inv"],
  description: "Hívd meg a botot a saját szerveredre!",
  execute(message) {

    let inviteEmbed = new MessageEmbed()
      .setTitle("Add hozzá a szerveredhez!")
      .setDescription("Szereted a botot? Add hozzá a szerveredhez!")
      .setColor("#F0EAD6")
      .setAuthor('HurkaTamasJoska2')
      .setThumbnail(message.guild.iconURL())
      .addField(`Invite: `, 'https://discord.com/api/oauth2/authorize?client_id=846028092672573440&permissions=8&scope=bot', true)

    inviteEmbed.setTimestamp();

    return message.channel.send(inviteEmbed).catch(console.error);
  }
};