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
  name: "stop",
  description: "Megállítja a zenét",
  aliases: ["leave", "end"],
  cooldown: 5,
  edesc: `Írd be, hogy megállítsd a zenét, és kiléptess a szobábol.\nUsage: ${PREFIX}stop`,

async execute(message,args,client) {
  //if not in a guild retunr
  if (!message.guild) return;
  //react with approve emoji
  message.react(approveemoji).catch(console.error);
  const { channel } = message.member.voice;
  //get the serverQueue
  const queue = message.client.queue.get(message.guild.id);
  //if not a valid channel
  if (!channel) return attentionembed(message, "Menj hangcsatárnába először");  
  //If not in the same channel return error
  if (queue && channel !== message.guild.me.voice.channel)
  return attentionembed(message, `Egy csatornában kell lenned velem.`);
  //if no Queue return error
  if (!queue)
    return attentionembed(message, "Nincs zene, amit stoppolnál.");
  //if not in the same channel return
  if (!canModifyQueue(message.member)) return;
  //Leave the channel
  await channel.leave();
  //send the approve message    
  message.channel.send(new MessageEmbed()
  .setColor("#F0EAD6")
  .setAuthor(`${message.author.username} stoppolta a zenét.`))
  .catch(console.error);
  }
};
