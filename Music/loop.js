////////////////////////////
//////CONFIG LOAD///////////
////////////////////////////
const { canModifyQueue } = require("../util/nkm");
const { Client, Collection, MessageEmbed } = require("discord.js");
const { attentionembed } = require("../util/attentionembed"); 
const { approveemoji,  denyemoji,  PREFIX,} = require(`../config.json`);
////////////////////////////
//////COMMAND BEGIN/////////
////////////////////////////
module.exports = {
  name: "loop",
  aliases: ['l', 'lp'],
  description: "Zene ujrajátszás bekapcs/kikapcs",
  cooldown: 3,
  edesc: `Írd be, hogy ujra, meg ujra játszd a zenét.\nUsage: ${PREFIX}loop`,
execute(message) {
    //if not in a Guild return
    if(!message.guild) return;
    //Get the current Queue
    const queue = message.client.queue.get(message.guild.id);
    //If no Queue Error
    if (!queue) return attentionembed(message, "There is nothing playing").catch(console.error);
    //If not in a VOICE 
    if (!canModifyQueue(message.member)) return;
    //Reverse the Loop state
    queue.loop = !queue.loop;
    //Define the Loop embed
    const loopembed = new MessageEmbed()
    .setColor(queue.loop ? "#F0EAD6" : "#F0EAD6")
    .setAuthor(`Ujrajátszás ${queue.loop ? " enabled" : " disabled"}`)
    //react with approve emoji
    message.react(approveemoji);
    //send message into the Queue chat
    return queue.textChannel
      .send(loopembed)
      .catch(console.error);
  }
};
