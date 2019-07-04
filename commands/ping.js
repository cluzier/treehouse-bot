var now = require('performance-now');
exports.run = (client, message, args) => {
  var pStart = now();
  message.channel.send("Checking ping...").then(message => {
    var pEnd = now();
    message.edit("Current latency is " + (pEnd - pStart).toFixed(2) + " ms and the current websocket ping is " + client.ping.toFixed(0) + ".");
  }).catch(error => console.log("Error executing ping command:\n"));
};
