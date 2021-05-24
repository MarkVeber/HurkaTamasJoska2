////////////////////////////
//////CONFIG LOAD///////////
////////////////////////////
const { MessageEmbed, splitMessage, escapeMarkdown } = require("discord.js");
const { Client, Collection } = require("discord.js");
const { attentionembed } = require("../util/attentionembed"); 
const {
  approveemoji,
  denyemoji,
  PREFIX,
} = require(`../config.json`);
////////////////////////////
//////COMMAND BEGIN/////////
////////////////////////////
module.exports = {
  name: "lista",
  aliases: ["ls", "list"],
  description: "Megmutatja a listát és a lejátszott zenét.",
  cooldown: 7.5,
  edesc: `Írd be, hogy megnézd a listát.\nUsage: ${PREFIX}queue`,
  execute(message) {
    //if not in a guild return
    if(!message.guild) return;
    //get serverqueue
    const queue = message.client.queue.get(message.guild.id);
    //if no queue aka nothing playing error
    if (!queue) return attentionembed(message, "Nincs zene a listában.").catch(console.error);
    //set description
    console.log(queue.songs);
    let description = "";
    for(let i = 1; i < queue.songs.length; i++){
      description += `**${i}.** [${queue.songs[i].title.substring(1,40)}](${queue.songs[i].url}) | \`${queue.songs[i].duration}\`\n`
    }
    //define queueembed
    let queueEmbed = new MessageEmbed()
      .setTitle("Zenelista")
      .setDescription(description)
      .setColor("#F0EAD6");
    //split the description
    const splitDescription = splitMessage(description, {
      maxLength: 2048,
      char: "\n",
      prepend: "",
      append: ""
    });
    //For every description send a new embed
    splitDescription.forEach(async (m) => {
      //(over)write embed description
      queueEmbed.setDescription(m);
      //react with emoji
      message.react(approveemoji)
      //send embed
      message.channel.send(queueEmbed);
    });
  }
};
