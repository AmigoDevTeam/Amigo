const { version } = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const messageData = require("../messageData.json");
const Discord = require("discord.js");

exports.run = (client, message) => {
  const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");

  const embed = new Discord.RichEmbed()
    .setAuthor("Bot Statistics 🤖")
    .setColor("#9669FE")
    .setTimestamp()
    .addField("Mem Usage:", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`)
    .addField("Uptime:", `${duration}`)
    .addField("Users:", `${client.users.size.toLocaleString()}`)
    .addField("Servers:", `${client.guilds.size.toLocaleString()}`)
    .addField("Channels:", `${client.channels.size.toLocaleString()}`)
    if (message.guild) {
    embed.addField("Total commands ran today in this server: ", messageData[message.guild.id].commandsRan)
  }
    embed.addField("Total commands ran today: ", messageData["totalMessages"].commandsRan)
    if (message.guild) {
    embed.addField("Total messages read today in this server ", messageData[message.guild.id].messages)
  }
    embed.addField("Total messages read today: ", messageData["totalMessages"].messages)
    embed.addField("Discord.js:", `v${version}`);

  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "stats",
  category: "Miscelaneous",
  description: "Gives some useful bot statistics.",
  usage: "stats"
};
