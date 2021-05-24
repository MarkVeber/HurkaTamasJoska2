const { Client, Collection, MessageEmbed } = require(`discord.js`);
const {
  PREFIX,
  approveemoji,
  denyemoji
} = require(`../config.json`);

module.exports = {
  name: `uptime`,
  description: `Itten is van az UPTIME!`,
  aliases: [],
  cooldown: 5,
  edesc: "Láthatod, hogy állandóan megáll ez a szar bot.",
  execute(message, args, client) {
    let days = Math.floor(client.uptime / 86400000);
    let hours = Math.floor(client.uptime / 3600000) % 24;
    let minutes = Math.floor(client.uptime / 60000) % 60;
    let seconds = Math.floor(client.uptime / 1000) % 60;
    //react with approve emoji
    message.react("✅");
    return message.channel.send(new MessageEmbed().setColor("#F0EAD6").setTitle(`***UPTIME:***\n\n\`${days}d\` \`${hours}h\` \`${minutes}m\` \`${seconds}s\n\``));


  }
}