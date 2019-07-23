var Discord = require("discord.js");
var client = new Discord.Client();
var pageMenu = require("@quantiom/pagemenu");

exports.run = (client, message, args) => {
  let pMenu = new pageMenu(
    message,
    [{
        title: "Help | Commands",
        description: "Page 1",
        thumbnail: `${client.user.avatarURL}`,
        color: "66cdaa", // green
        fields: [{
            name: "ping",
            value: "Returns latency and websocket ping.",
            inline: true
          },
          {
            name: "info",
            value: "Returns info about the bot, including uptime and a user count.",
            inline: true
          },
          {
            name: "help",
            value: "Returns information about bot commands.",
            inline: true
          },
          {
            name: "bugreport",
            value: "Submit a bug report for review. Example: >bugreport (reason).",
            inline: true
          },
          {
            name: "warn",
            value: "Warns a user.",
            inline: true
          }
        ]
      },
      {
        title: "Help | Commands",
        description: "Page 2",
        thumbnail: `${client.user.avatarURL}`,
        color: "66cdaa", // green
        fields: [{
            name: "warnlvl",
            value: "Check a user's warning level.",
            inline: true
          },
          {
            name: "kick",
            value: "Kicks a user.",
            inline: true
          },
          {
            name: "tempmute",
            value: "Mute a user for a specified amount of time.",
            inline: true
          },
          {
            name: "ban",
            value: "Bans a user.",
            inline: true
          },
          {
            name: "unban",
            value: "Unban a user.",
            inline: true
          }
        ]
      },
      {
        title: "Help | Commands",
        description: "Page 3",
        thumbnail: `${client.user.avatarURL}`,
        color: "66cdaa", // green
        fields: [{
            name: "serverinfo",
            value: "Displays info about the server.",
            inline: true
          },
          {
            name: "userinfo",
            value: "Displays info about a user.",
            inline: true
          },
          {
            name: "softban",
            value: "Softban a user, deleting messages from them for 7 days, then allowing them to immediately rejoin.",
            inline: true
          },
          {
            name: "purge",
            value: "Deletes a specified amount of messages.",
            inline: true
          },
          {
            name: "lockdown",
            value: "Lock a channel for a specified amount of time.",
            inline: true
          },
        ]
      },
      {
        title: "Help | Commands",
        description: "Page 4",
        thumbnail: `${client.user.avatarURL}`,
        color: "66cdaa", // green
        fields: [{
            name: "kill",
            value: "Kill a user or yourself. Counts how many kills per user.",
            inline: true
          },
          {
            name: "hug",
            value: "Hug a user, counts how many hugs per user.",
            inline: true
          },
          {
            name: "meme",
            value: "Generates a ranom meme from /r/dankmemes.",
            inline: true
          },
          {
            name: "pewds",
            value: "Generates a random meme from /r/pewdiepie.",
            inline: true
          }
        ]
      },

    ], {
      duration: 60000,
      expireFunction: function (msg) {
        msg.delete();
      }
    }
  );

  pMenu.run();
};