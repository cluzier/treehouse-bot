var now = require("performance-now");
const n = require("../n.json");
exports.run = (client, message, args) => {
  if (message.author.id !== n.oID) return;
  message.channel.send("Restarting " + n.name + "...");
  var sTime = now();
  client.destroy();
  client.login(n.token).then(smessage => {
    var eTime = now();
    message.channel.send(`${n.name} took ${(eTime - sTime).toFixed(0)} ms to restart.`);
  });
}
