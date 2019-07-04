const n = require("../n.json");
const Discord = require("discord.js");
const human = require('humanize');
exports.run = (client, message, args) => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.member.hasPermission("KICK_MEMBERS") || message.author.id !== n.oID) {
    message.channel.send("You are missing the permission(s): Kick Members.");
  } else {
    let time = new Date();
    function amPm() {
      if (time.getHours() >= 11) {
        return "PM";
      } else return "AM";
    }
    var testCont = message.content.split(" ");
    var content = message.content.split(" ").slice(2).join(' ');
    var kicked = message.mentions.users.first();
    if (message.mentions.users.size < 1) {
      message.channel.send("You must provide a user to kick!");
    } else if (testCont.length <= 2) {
      message.channel.send("Please provide a reason for the kick.");
    } else if (message.guild.member(kicked).kickable) {
      client.users.get(kicked).send(`You have been kicked from ${message.guild.name} for: ${content} by ${message.author.username}`);
      message.guild.member(kicked).kick().then(kicked => {
        var embed = new Discord.RichEmbed()
        .setTitle("Kick")
        .setDescription(`Kicked ${kicked.displayName}.`)
        .setAuthor(message.author.username + "#" + message.author.discriminator, `${message.author.avatarURL}`)
        .addField("Time",
          `Kick occured at ${human.date('m-d-y | h:i:s', new Date())} ${amPm()}`)
        .addField("Moderator",
          `Kick administered by ${message.author.username}#${message.author.discriminator}`)
        .addField("Reason",
          `${content}`)
        .setColor("#ff0000")
        .setTimestamp()
        message.channel.send(embed);
      });
    } else message.channel.send("I am unable to kick that member.");
  }
}
