const n = require("../n.json");
const fs = require('fs');
exports.run = (client, message, args) => {
  if (message.author.id !== n.oID) return;
  var args1 = message.content.split(" ").slice(1);
  var argsTogether = args1.join(" ");
  var botSetup = {
    "name":n.name,
    "token":n.token,
    "oID":n.oID,
    "prefix":n.prefix,
    "version":n.version,
    "dGame":argsTogether
  }
  var data = JSON.stringify(botSetup, null, 4);
  fs.writeFileSync("./n.json", data);
  message.channel.send(`Game set to ${argsTogether}!\nRestarting so changes can take effect...`);
  client.destroy();
  client.login(n.token);
}
