module.exports = { 
    name: "leave", 
    aliases: ['lv'], 
    description: "Kilép a csatornábol.", 
    execute(message) {
         const { channel } = message.member.voice; 
         const serverQueue = message.client.queue.get(message.guild.id); 
         if (!channel) return message.reply("Először be kell lépned egy hangcsatornába").catch(console.error); 
         if (!message.guild.me.voice.channel) return message.reply("Nem vagyok a csatornában!").catch(console.error); 
         if (channel.id !== message.guild.me.voice.channel.id) return message.reply("Nem vagyunk egy csatornában!").catch(console.error); 
         if(serverQueue) { 
             serverQueue.connection.dispatcher.destroy(); 
             channel.leave(); 
             message.client.queue.delete(message.guild.id); 
             serverQueue.textChannel.send('Kiléptem a szobábol.').catch(console.error); 
             return 
            }
            channel.leave(); 
            
    message.client.queue.delete(message.guild.id); 
    message.channel.send('Kiléptem a szobábol.').catch(console.error); } };