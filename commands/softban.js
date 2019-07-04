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
  function amPm() {
  let time = new Date();
  if (time.getHours() >= 11) {
    return "PM";
    } else return "AM";
  }
  var testCont = message.content.split(" ");
  var content = message.content.split(" ").slice(2).join(' ');
  var banned = message.mentions.users.first();
  if (message.mentions.users.size < 1) {
    message.channel.send("You must provide a user to softban!");
  } else if (testCont.length <= 2) {
    message.channel.send("Please provide a reason for the softban.");
  } else if (message.guild.member(banned).bannable) {
    client.guilds.get(message.guild.id).channels.find("name", message.guild.defaultChannel.name).createInvite().then(inv => {
    var invite = `https://discord.gg/${inv.code}`;
    client.users.get(banned.id).send(`You have been softbanned from ${message.guild.name} for: ${content} by ${message.author.username}\nYou may rejoin with the invite link: ${invite}`).then(() => {
      message.guild.member(banned).ban(7).then(banned => {
        var embed = new Discord.RichEmbed()
        .setTitle("Softban")
        .setDescription(`Softanned ${banned.displayName}.`)
        .setAuthor(message.author.username + "#" + message.author.discriminator, `${message.author.avatarURL}`)
        .addField("Time",
          `Softban occured at ${human.date('m-d-y | h:i:s', new Date())} ${amPm()}`)
        .addField("Moderator",
          `Softban administered by ${message.author.username}#${message.author.discriminator}`)
        .addField("Reason",
          `${content}`)
        .setColor("#ff0000")
        .setTimestamp()
        message.channel.send(embed);
        message.guild.unban(banned);
      });
    });
  });
    } else message.channel.send("I am unable to softban that member.");
  }
}
