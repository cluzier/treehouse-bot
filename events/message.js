const kick = require("../commands/kick");
const ban = require("../commands/ban");
const purge = require("../commands/purge");

module.exports = (client, message) => {
  if (message.content.startsWith(">ban")) {
    return ban(message);
  }
  if (message.content.startsWith(">kick")) {
    return kick(message);
  }
  if (message.content.startsWith(">purge")) {
    return purge(message);
  }
  if (message.content === '>ping') {
    message.reply('Pong!')
  }
  if (message.content === '>about') {
    message.reply(message);
  }
};