const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("You don't have `KICK_MEMBERS` permissions.");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if (wUser === message.author) return message.channel.send("Are you retarted? Why do you wanna warn yourself?")
  if (!wUser) return message.reply("Couldn't find the user.");
  let reason = args.join(" ").slice(22);
  if (!reason) return message.channel.send("Please provide a reason!")
  if (!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };

  warns[wUser.id].warns++;

  fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err)
  });

  let warnEmbed = new Discord.RichEmbed()
    .setTitle("Warn")
    .setColor("#fc6400")
    .addField("User", `${wUser.user.tag}`)
    .addField("Moderator", `${message.author.tag}`)
    .addField("Number of Warnings", warns[wUser.id].warns)
    .addField("Reason", `${reason ? reason : "None."}`);

  let warnchannel = message.guild.channels.find(`name`, "mod-logs");
  if (!warnchannel) return message.channel.send("Couldn't find `mod-log` channel**");
  warnchannel.send(warnEmbed);
  wUser.send(warnEmbed);
  message.channel.send("That user has been warned.")


}

module.exports.help = {
  name: "warn"
}