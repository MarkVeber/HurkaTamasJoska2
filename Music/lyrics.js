const { MessageEmbed } = require("discord.js");
const lyricsFinder = require("lyrics-finder");

module.exports = {
  name: "lyrics",
  aliases: ["ly"],
  description: "Keres egy szöveget a zenéhez",
  async execute(message) {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("Nincs zene").catch(console.error);

    let lyrics = null;

    try {
      lyrics = await lyricsFinder(queue.songs[0].title, "");
      if (!lyrics) lyrics = `Nem találtam szöveget ezekhez - ${queue.songs[0].title}.`;
    } catch (error) {
      lyrics = `Nemteláltam szöveget ehez - ${queue.songs[0].title}.`;
    }

    let lyricsEmbed = new MessageEmbed()
      .setTitle("Lyrics")
      .setDescription(lyrics)
      .setColor("#F0EAD6")
      .setTimestamp();

    if (lyricsEmbed.description.length >= 2048)
      lyricsEmbed.description = `${lyricsEmbed.description.substr(0, 2045)}...`;
    return message.channel.send(lyricsEmbed).catch(console.error);
  }
};