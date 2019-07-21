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
      message.channel.send(`${message.author} killed ${target.tag} 🔪`)
      message.channel.send(`${target.tag} has been killed for the first time!`);
    } else {
      deathCount = (kills[id] = kills[id] + 1);
      message.channel.send(`${message.author} killed ${target.tag} 🔪`)
      message.channel.send(`${target.tag} has been killed for the ${deathCount} times!`);
    }

    // Update kills file
    fs.writeFileSync(
      "../killed.json",
      JSON.stringify(kills),
      (err) => console.log(err),
      console.log(`${message.author} killed ${target.tag} 🔪`)
    );
  }