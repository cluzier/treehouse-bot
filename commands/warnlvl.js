const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = require('../warnings.json');

module.exports.run = async (bot, message, args) => {

	let wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
	if(!wUser) return message.channel.send(":x:" + " ***I couldn't find this user***").then(m => {
	}); 

	let warnlevel = warns[wUser.id].warns;
	
	if(warnlevel, (err) => {
		if(warnlevel === 1) return message.channel.send({embed: {
			color: 15105570,
			description: `<@${wUser.id}> has 0 warnings`
		}});
	});
		
	
	if(warnlevel === 1) return message.channel.send({embed: {
		color: 15105570,
		description: `<@${wUser.id}> has 1 warning`
	}});
	
	let warnlvlEmbed = new Discord.RichEmbed()
		.setColor("#FFA500")
		.setDescription(`<@${wUser.id}> has ${warnlevel} warnings`);
		
	message.channel.send(warnlvlEmbed);
	
};

module.exports.help = {
	name: "warnings",
}