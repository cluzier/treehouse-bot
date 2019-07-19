require("events").EventEmitter.prototype._maxListeners = 100;
const Discord = require("discord.js");
const client = new Discord.Client();
const n = require("./n.json");
const now = require("performance-now");
const prettyBytes = require("pretty-bytes");
const chalk = require("chalk");
require("./util/eventLoader")(client);
var prefix = ":";
var version = "0.0.1";
const human = require("humanize");
process.on("unhandledRejection", err => {
  console.log("Unhandled Rejection:\n" + err.stack);
});
var reload = (message, cmd) => {
  if (message.content.split(" ").length !== 2)
    message.channel.send("You must provide a module to reload!");
  delete require.cache[require.resolve("./commands/" + cmd)];
  try {
    let comFile = require("./commands/" + cmd);
  } catch (err) {
    console.log(`Error loading command ${cmd}:\n${err}`);
  }
  message.channel.send(`${cmd} reload successful.`);
};

var nohead = ["so no head", "So no head", "so no head?", "So no head?"];

client.on("message", (message) => {

  const responseObject = {
    "so no head": "no " + message.author + ", no head",
    "So no head": "no " + message.author + ", no head"
  };

  if (responseObject[message.content]) {
    message.channel.send(responseObject[message.content]);
  }

});

exports.reload = reload;
client.login(n.token);