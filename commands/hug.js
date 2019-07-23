const Discord = require("discord.js");
const fs = require('fs');
const hugs = require('../hugged.json');

exports.run = (client, message, args) => {
  const target = message.mentions.users.first();

  if (!target)
    return message.channel.send(`Please tag someone to hug.`);

  const id = target.id;
  let hugCount = hugs[id];

  if (!hugCount) {
    hugs[id] = 1;

    const emb = new Discord.RichEmbed()
      .setColor('#0099ff')
      .addField(`${message.author} hugged ${target.tag} 🤗`, `${target.tag} has been hugged for the first time!`, true)
      .setImage('https://i.imgur.com/UV1JK09.gif')

    message.channel.send(emb);

  } else {
    hugCount = (hugs[id] = hugs[id] + 1);

    const emb = new Discord.RichEmbed()
      .setColor('#0099ff')
      .addField(`${message.author} hugged ${target.tag} 🤗`, `${target.tag} has been hugged ${hugCount} times!`, true)
      .setImage('https://i.imgur.com/UV1JK09.gif')

    message.channel.send(emb);

  }

  // Update hugs file
  fs.writeFileSync(
    "./hugged.json",
    JSON.stringify(hugs),
    (err) => console.log(err)
  );
}