const n = require("../n.json");
exports.run = (client, message, args) => {
  if (message.author.id !== n.oID) return;
  let content = message.content.split(" ").slice(1).join(' ');
  let result = new Promise((resolve, reject) => resolve(eval(content)));
  return result.then(check => {
    if (typeof check !== 'string') check = require('util').inspect(check, {
      depth: 0
    });
    if (check.includes(client.token)) check = check.replace(client.token, "Error: Output contained bot token.");
    return message.channel.send( "Input: " + content + "\n" + "Output: " + check, {code: "js"});
  }).catch(error => {
    console.error(error);
    message.channel.send("Error: Output has been logged to console.", {code: "js"});
  });
};
