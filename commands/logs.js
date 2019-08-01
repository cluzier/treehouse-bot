const Discord = require("discord.js");
const client = new Discord.Client();
const SQLite = require("better-sqlite3");
const sql = new SQLite('./treeLogs.sqlite');

exports.run = async (client, message) => {
  // if(!message.author.id === message.guild.owner) return message.reply("You do not have permissions to view chat logs.");
  const msglogs = sql.prepare("SELECT username, message FROM lounge LIMIT 1").all(message.guild.id);
  const embed = new Discord.RichEmbed()
      .setTitle("Message Logs")
      .setAuthor(client.user.username, client.user.avatarURL)
      .setColor(0x00AE86);
      
  for (const data of msglogs) {
    embed.addField(client.users.get(data.user).tag, `${data.username} points (level ${data.message})`);
  }
  return message.channel.send({
    embed
  });
}