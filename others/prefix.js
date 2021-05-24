const { Client, Collection, MessageEmbed } = require(`discord.js`);
const {
  PREFIX,
  approveemoji,
  denyemoji
} = require(`../config.json`);

const db = require('quick.db');


module.exports = {
  name: `prefix`,
  description: `Saját prefixet állít be.`,
  aliases: ["setprefix"],
  cooldown: 5,
  edesc: `Használat: ${PREFIX}prefix <ÚJ PREFIX>`,
 async execute(message, args, client) {

    let prefix = await db.get(`prefix_${message.guild.id}`)
    if(prefix === null) prefix = PREFIX;

    //react with approve emoji
    message.react("✅");

    if(!args[0]) return message.channel.send(new MessageEmbed()
    .setColor("#F0EAD6")
    .setTitle(`Current Prefix: \`${prefix}\``)
    .setFooter('Adj meg prefixet.')
    );
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply(new MessageEmbed()
    .setColor("#F0EAD6")
    .setTitle(`🚫 Ehez neked nincs jogod!`)
    );

    if(args[1]) return message.channel.send(new MessageEmbed()
    .setColor("#F0EAD6")
    .setTitle(`'❗Nem használhatsz 2 spacet.'`));

    db.set(`prefix_${message.guild.id}`, args[0])

    message.channel.send(new MessageEmbed()
    .setColor("#F0EAD6")
    .setTitle(`✅ Beállítottam a prefix-et, az új prefix: **\`${args[0]}\`**`))
  }
}