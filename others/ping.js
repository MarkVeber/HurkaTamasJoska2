const { Client, Collection, MessageEmbed } = require(`discord.js`);
const {
  PREFIX,
  approveemoji,
  denyemoji
} = require(`../config.json`);

module.exports = {
  name: `ping`,
  description: `Megtudhatod a bot pingjét.`,
  aliases: ["latency"],
  cooldown: 2,
  edesc: "Ez azt mutatja, milyen gyorsan válaszol a bot.",
  execute(message, args, client) {
    //react with approve emoji
    message.react("✅");
    //send the Ping embed
    message.reply(new MessageEmbed().setColor("#F0EAD6").setTitle(":ping_pong: `" + client.ws.ping + "ms`"));
  }
}