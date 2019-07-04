const n = require('../n.json');
exports.run = (client, message, args) => {
  if (message.author.id !== n.oID) return;
  message.channel.send("Shutting down...");
  client.destroy();
}
