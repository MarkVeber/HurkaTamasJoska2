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
  name: "remove",
  description: "Törli a zenét a listábol.",
  aliases: ["delete"],
  cooldown: 1.5,
  edesc: `Ird be, hogy törölj egy zenét a listábol.\nHasználat: ${PREFIX}remove <Lista szám>`,

execute(message, args) {
  //if its not a guild return
    if(!message.guild) return;
    //get the queue
    const queue = message.client.queue.get(message.guild.id);
    //if there is no queue return error
    if (!queue) return attentionembed(message,"Nincs lista.");
    //if he isnt in the same voice channel as the bot
    if (!canModifyQueue(message.member)) return;
    //if no args then return error
    if (!args.length) return attentionembed(message,`Próbáld: ${message.client.prefix}remove <Lista szám>`);
    //If not a number then return error
    if (isNaN(args[0])) return attentionembed(message,`Próbáld: ${message.client.prefix}remove <Lista szám>`);
    //get the song
    const song = queue.songs.splice(args[0] - 1, 1);
    //react with approve
    message.react(approveemoji)
    //send approve
    queue.textChannel.send(new MessageEmbed()
    .setDescription(`:no_entry_sign: | ${message.author} Töröltem a(z) **${song[0].title}** zenét a listábol.`)
    .setColor("#F0EAD6")
    );
  }
};
