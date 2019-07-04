const n = require('../n.json');
module.exports = message => {
  if (!message.content.startsWith(n.prefix)) return;
  if (message.author.bot) return;
  const client = message.client;
  var prefix = n.prefix;
  const args = message.content.split(' ');
  let command = args.shift().slice(n.prefix.length);
  try {
    let comFile = require(`../commands/${command}`);
    comFile.run(client, message, args);
  } catch (err) {
    if (err.message === `Cannot find module '../commands/${command}'`) {
      return;
    } else
    console.log('Error: ' + command + " failed to execute\n" + err.stack);
  }
};
