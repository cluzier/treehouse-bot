const Discord = require('discord.js');
const n = require('../n.json');
exports.run = (client, message, args) => {
  function randomColor() {
    var colors = ["#00F5FF", "#7FFFD4", "#008B45", "#FFD700", "#FF8000", "#FF0000", "#7FFF00", "#00BFFF", "	#000080", "#8A2BE2", "#FFB5C5", "#00FFF7", "#B120DF", "#DF2057", "#FFFFFF", "#B2FF00"];
    var colorNum = Math.floor(Math.random()*colors.length);
    return colors[colorNum];
  }
  const embed = new Discord.RichEmbed()
  .setAuthor(message.author.username + "#" + message.author.discriminator, `${message.author.avatarURL}`)
  .setThumbnail(`${client.user.avatarURL}`)
  .setTitle("Help | Commands")
  .setDescription("Help for " + n.name)
  .setColor(randomColor())
  .addField("ping",
    "Returns latency and websocket ping.")
  .addField("info",
    "Returns info about the bot, including uptime and a user count.")
  .addField("help",
    "Returns information about bot commands.")
  .addField("bugreport",
    "Submit a bug report for review. Example: >bugreport (reason)")
  .addField("warn",
    "Warns a user. Available to those able to kick users.")
  .addField("ban",
    "Bans a user. Available to those able to ban users.")
  .addField("unban",
    "Unban a user.")
  .addField("kick",
    "Kicks a user. Available to those able to kick users.")
  .addField("tempmute",
    "Mute a user for a specified amount of time.")
  .addField("purge",
    "Deletes a specified amount of messages. Available to those able to delete messages.")
  .addField("serverinfo",
    "Displays info about a server.")
  .addField("userinfo",
    "Displays info about a user.")
  .addField("softban",
    "Softbans a user, deleting messages from them for 7 days, then allowing them to immediately rejoin. Available to those able to ban users.")
  .setFooter("coded by gonzo#3813")
  .setTimestamp()
  message.channel.send(embed);
};
