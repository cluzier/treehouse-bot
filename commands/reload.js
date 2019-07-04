const n = require("../n.json");
const main = require('../spark.js');
exports.run = (client, message, args) => {
  if (message.author.id !== n.oID) return;
  let cmd = args.join(' ');
  main.reload(message, cmd);
};
