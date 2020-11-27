var Discord = require("discord.js");
const ms = require("ms");
  exports.run = async (bot, message, args = []) => {

    if(message.member.hasPermission("MANAGE_GUILD")) {

    if (!bot.lockit) bot.lockit = [];
  
    let time = args.join(' ')
    let validUnlocks = ['release', 'unlock'];
    var notimeembed = new Discord.RichEmbed()
    .setTitle('Error')
    .setDescription("👾 You must set a duration for the lockdown in either hours, minutes or seconds")  
    .setColor('36393e')
    if (!time) return message.channel.send(notimeembed);

    if (validUnlocks.includes(time)) {
      message.channel.overwritePermissions(message.guild.id, {
        SEND_MESSAGES: null
      }).then(() => {
        var liftedembed = new Discord.RichEmbed()
        .setTitle('🔒 Lockdown')
        .setDescription("🔓 Lockdown lifted.")  
        .setColor('36393e')
        message.channel.send(liftedembed);
        clearTimeout(bot.lockit[message.channel.id]);
        delete bot.lockit[message.channel.id];
      }).catch(error => {
        console.log(error);
      });
    } else {
      message.channel.overwritePermissions(message.guild.id, {
        SEND_MESSAGES: false
      }).then(() => {
        var lockdownembed = new Discord.RichEmbed()
        .setTitle("🔒 Channel Locked")
        .addField("Locked by", `${message.author}`, true)
        .addField("Locked for", `${ms(ms(time), { long:true })}`, true)
        .setColor('36393e')
        message.channel.send(lockdownembed).then(() => {

          bot.lockit[message.channel.id] = setTimeout(() => {
            var liftedembed = new Discord.RichEmbed()
            .setTitle('🔒 Lockdown')
            .setDescription("🔓 Lockdown lifted.")  
            .setColor('36393e') 
            message.channel.overwritePermissions(message.guild.id, {
              SEND_MESSAGES: null
            }).then( 
               
              message.channel.send(liftedembed)).catch(console.error);
            delete bot.lockit[message.channel.id];
          }, ms(time));

        }).catch(error => {
          console.log(error);
        });
      });
    }

    } else {
        var nopermsembed = new Discord.RichEmbed()
        .setTitle('Error')
        .setDescription("👾 Missing Permissions :: MANAGE_SERVER")  
        .setColor('36393e')
        message.channel.send(nopermsembed)
    }




};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [""],
  permLevel: 0
};

exports.help = {
  name: "lockdown",
  description: "locks the channel down",
  category: "administration",
  usage: " lockdown <time>"
};
