const n = require("../n.json");
const Discord = require("discord.js");
exports.run = (client, message, args) => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (message.author.id !== n.oID) return;
  function randomColor() {
    var colors = ["#00F5FF", "#7FFFD4", "#008B45", "#FFD700", "#FF8000", "#FF0000", "#7FFF00", "#00BFFF", "	#000080", "#8A2BE2", "#FFB5C5", "#00FFF7", "#B120DF", "#DF2057", "#FFFFFF", "#B2FF00"];
    var colorNum = Math.floor(Math.random()*colors.length);
    return colors[colorNum];
  }
  var args1 = message.content.split(" ").slice(1);
  var sGuild = args1[0];
  if (!client.guilds.get(args1[0])) message.channel.send("Client is not in this guild.");
  client.guilds.get(args1[0]).channels.find("name", message.guild.defaultChannel.name).createInvite().then(inv => {
    var invite = `https://discord.gg/${inv.code}`;
    var embed = new Discord.RichEmbed()
    .setTitle("Guild Information")
    .setDescription("Information for " + client.guilds.get(sGuild).name)
    .setThumbnail(`${client.guilds.get(sGuild).iconURL}`)
    .setAuthor(message.author.username + "#" + message.author.discriminator, `${message.author.avatarURL}`)
    .setColor(randomColor())
    .addField("Name",
      client.guilds.get(sGuild).name, true)
    .addField("Users",
      client.guilds.get(sGuild).memberCount, true)
    .addField("Owner",
      client.guilds.get(sGuild).owner.id + " || " + `${client.guilds.get(sGuild).owner.displayName}`, true)
    .addField("Invite",
      invite)
    .setTimestamp()
    message.channel.send(embed);
  });
}
