const discord = require('discord.js');
const n = require('../n.json');
exports.run = (client, message, args) => {
  if (message.author.id !== n.oID) return;
  var args1 = message.content.split(" ").slice(1);
  var content = args1[0].toLowerCase();
  if (content !== "dnd" && content !== "online" && content !== "idle" && content !== "invisible") {
    message.channel.send("Please only use online, idle, dnd, or invisible as status options");
  } else {
    client.user.setStatus(content);
    if (content !== "invisible") {
      message.channel.send(`Status set to ${content}`);
    } else {
      client.users.get(message.author.id).send(`Status set to invisible.`);
    }
  }
}
