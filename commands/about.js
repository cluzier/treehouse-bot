module.exports = message => {
const Discord = require('discord.js');

// inside a command, event listener, etc.
const exampleEmbed = new Discord.RichEmbed()
	.setColor('#0099ff')
	.setTitle('Treehouse-Bot')
	.setAuthor('gonzo#3813')
	.setDescription('Moderation at its finest.')
	.setThumbnail('https://cdn.discordapp.com/icons/571851329753055262/a_853656f18010c3df1f43a54eefd1548e.png')
	.addBlankField()
	.setImage('https://cdn.discordapp.com/icons/571851329753055262/a_853656f18010c3df1f43a54eefd1548e.png')
	.setTimestamp()
	.setFooter('coded by gonzo#3813');

channel.send(exampleEmbed);
};