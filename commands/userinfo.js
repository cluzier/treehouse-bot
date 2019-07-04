const n = require("../n.json");
const Discord = require('discord.js');
const human = require('humanize');
function randomColor() {
  var colors = ["#00F5FF", "#7FFFD4", "#008B45", "#FFD700", "#FF8000", "#FF0000", "#7FFF00", "#00BFFF", "	#000080", "#8A2BE2", "#FFB5C5", "#00FFF7", "#B120DF", "#DF2057", "#FFFFFF", "#B2FF00"];
  var colorNum = Math.floor(Math.random()*colors.length);
  return colors[colorNum];
}
exports.run = (client, message, args) => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (message.mentions.users.size > 1) {
    message.channel.send("Please only mention one user.");
  } else if (message.mentions.users.size === 0) {
    const embed = new Discord.RichEmbed()
    .setTitle("User Information")
    .setDescription("Information for " + message.author.username)
    .setThumbnail(`${message.author.avatarURL}`)
    .setAuthor(message.author.username + "#" + message.author.discriminator, `${message.author.avatarURL}`)
    .setColor(randomColor())
    .addField("User ID",
      message.author.id, true)
    .addField("Join Date",
      `${human.date('m-d-y | h:i:s', message.member.joinedAt)} ${(message.member.joinedAt >= 12? "PM": "AM")}`, true)
    .addField("Account Creation Date",
      `${human.date('m-d-y | h:i:s', message.member.user.createdAt)} ${(message.member.user.createdAt >= 12? "PM": "AM")}`, true)
    .setTimestamp()
    message.channel.send(embed);
  } else {
  const embed = new Discord.RichEmbed()
  .setTitle("User Information")
  .setDescription("Information for " + message.mentions.users.first().username)
  .setThumbnail(`${message.mentions.users.first().avatarURL}`)
  .setAuthor(message.author.username + "#" + message.author.discriminator, `${message.author.avatarURL}`)
  .setColor(randomColor())
  .addField("User ID",
    message.mentions.users.first().id, true)
  .addField("Join Date",
    `${human.date('m-d-y | h:i:s', message.mentions.users.first().joinedAt)} ${message.mentions.users.first().joinedAt >= 12? "PM" : "AM"}`, true)
  .addField("Account Creation Date",
    `${human.date('m-d-y | h:i:s', message.mentions.users.first().createdAt)} ${message.mentions.users.first().createdAt >= 12? "AM" : "PM"}`, true)
  .setTimestamp()
  message.channel.send(embed);
  }
}
