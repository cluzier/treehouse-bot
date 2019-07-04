const fs = require('fs');
const n = require('../n.json');
exports.run = (client, message, args) => {
  if (message.author.id !== n.oID) return;
  var args1 = message.content.split(" ").slice(1);
  var botSetup = {
    "name":n.name,
    "token":n.token,
    "oID":n.oID,
    "prefix":args1[0],
    "version":n.version,
    "dGame":n.dGame
  }
  var data = JSON.stringify(botSetup, null, 4);
  fs.writeFileSync("./n.json", data);
  message.channel.send(`Prefix set to ${args1[0]}!`);
}
