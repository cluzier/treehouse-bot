const Discord = require("discord.js");
const fs = require('fs');
const kills = require('../killed.json');

exports.run = (client, message, args) => {
  const target = message.mentions.users.first();

  if (!target)
    return message.channel.send(`${message.author} killed themselves. 💀`);

  const id = target.id;
  let deathCount = kills[id];

  if (!deathCount) {
    kills[id] = 1;

    const emb = new Discord.RichEmbed()
      .setColor('#0099ff')
      .addField(`${message.author} killed ${target.tag} 🔪`, `${target.tag} has been killed for the first time!`, true)
      .setImage('https://i.imgur.com/7MkzxTT.gif')

    message.channel.send(emb);

  } else {
    deathCount = (kills[id] = kills[id] + 1);

    const emb = new Discord.RichEmbed()
      .setColor('#0099ff')
      .addField(`${message.author} killed ${target.tag} 🔪`, `${target.tag} has been killed ${deathCount} times!`, true)
      .setImage('https://i.imgur.com/7MkzxTT.gif')

    message.channel.send(emb);

  }

  // Update kills file
  fs.writeFileSync(
    "./killed.json",
    JSON.stringify(kills),
    (err) => console.log(err)
  );
}