const n = require("../n.json");
const human = require('humanize');
exports.run = (client, message, args) => {
  if (message.author.bot) return;
  if (!message.guild) return;
    if (!message.member.hasPermission("MANAGE_MESSAGES") && message.author.id !== n.oID) {
      message.channel.send("You are missing the permission(s): Manage Messages.");
    } else {
      var args1 = message.content.split(" ").slice(1);
      let mNumRem = parseInt(args1[0]);
        message.channel.bulkDelete(++mNumRem);
        message.channel.send(`Deleted ${--mNumRem} messages.`);
      }
}
