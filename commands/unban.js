const n = require("../n.json");
const Discord = require("discord.js");
const human = require('humanize');
exports.run = (client, message, args) => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!client.hasPermission("BAN_MEMBERS")) return;
  if (!message.member.hasPermission("BAN_MEMBERS") && message.author.id !== n.oID) {
    message.channel.send("You are missing the permission(s): Ban Members.");
  } else {
    let time = new Date();
    function amPm() {
      if (time.getHours() >= 11) {
        return "PM";
      } else return "AM";
    }
    var testCont = message.content.split(" ");
    var content = message.content.split(" ").slice(2).join(' ');
    var args1 = message.content.split(" ").slice(1);
    var unbanned = args1[0];
    if (testCont.length <=1) {
      message.channel.send("Please provide an ID of the user to unban!");
    } else if (testCont.length <= 2) {
      message.channel.send("Please provide a reason for the unban.");
    } else {
      message.guild.unban(unbanned).then(() => {
        var embed = new Discord.RichEmbed()
        .setTitle("Unban")
        .setDescription(`Unbanned ${unbanned} (ID).`)
        .setAuthor(message.author.username + "#" + message.author.discriminator, `${message.author.avatarURL}`)
        .addField("Time",
          `Unban occured at ${human.date('m-d-y | h:i:s', new Date())} ${amPm()}`)
        .addField("Moderator",
          `Unban administered by ${message.author.username}#${message.author.discriminator}`)
        .addField("Reason",
          `${content}`)
        .setColor("#008000")
        .setTimestamp()
        message.channel.send(embed);
      });
    }
  }
}
