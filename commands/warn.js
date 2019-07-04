const n = require("../n.json");
const human = require('humanize');
const Discord = require('discord.js');
exports.run = (client, message, args) => {
   if (!message.member.hasPermission("KICK_MEMBERS") && message.author.id !== n.oID) {
     message.channel.send("You lack the permission(s): Kick Members.");
   } else {
   let time = new Date();
   function amPm() {
     if (time.getHours() >= 11) {
       return "PM";
     } else return "AM";
   }
   if (message.content.startsWith(n.prefix + "warn")) {
     var testCont = message.content.split(" ");
     var content = message.content.split(" ").slice(2).join(' ');
     if (message.mentions.users.size < 1) {
       message.channel.send("You must provide a user to warn!");
     } else if (testCont.length <= 2) {
       message.channel.send("Please provide a reason for the warning.");
     } else {
     var embed = new Discord.RichEmbed()
     .setTitle("Warning")
     .setAuthor(message.author.username + "#" + message.author.discriminator, `${message.author.avatarURL}`)
     .setDescription("Warning issued to " + message.mentions.users.first().username + ".")
     .addField("Time",
       `Warning occured at ${human.date('m-d-y | h:i:s', new Date())} ${amPm()}`)
     .addField("Moderator",
       `Warning issued by ${message.author.username}#${message.author.discriminator}`)
     .addField("Reason",
       `${content}`)
     .setColor("#FFA500")
     .setTimestamp()
     message.channel.send(embed);
     }
   }
  }
}
