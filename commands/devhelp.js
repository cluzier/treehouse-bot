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
  .setTitle("Dev Help | Commands")
  .setDescription("Developer help for " + n.name)
  .setColor(randomColor())
  .addField("eval",
    "Evaluates a message as JS code.")
  .addField("shutdown",
    "Shuts the bot down.")
  .setFooter("coded by gonzo#3813")
  .setTimestamp()
  message.channel.send(embed);
};
