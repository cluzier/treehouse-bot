const Discord = require("discord.js");
const fs = require("fs");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("You don't have `MANAGE_MEMBERS` permissions.");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply("Couldn't find the user.");
  let warnlevel = warns[wUser.id].warns;

  let embed = new Discord.RichEmbed()
  .setTitle("Warnings")
  .addField("User", wUser.user.tag)
  .addField("Moderator", message.author.tag)
  .addField("Number of Warnings", `${warnlevel}`)
  .setColor("#f4b342")
  message.channel.send(embed);

}

module.exports.help = {
  name: "warnlvl"
}