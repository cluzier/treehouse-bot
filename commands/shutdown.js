const Discord = require('discord.js');

module.exports.run = async(bot, message, args) =>{
  let embed = new Discord.RichEmbed()
  .setTitle("Restart")
  .setDescription("Sorry, the `shutdown` command can only be executed by the Developer.")
  .setColor("#cdf785");
  if(message.author.id !== '209802617096896512') return message.channel.send(embed);
  
message.channel.send(`Shutting down in ${Math.floor(bot.ping)}ms`).then(() =>{
process.exit(1);
})
 

}
module.exports.help = {
name: "restart"
}