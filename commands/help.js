var Discord = require("discord.js");
var client = new Discord.Client();
var pageMenu = require("@quantiom/pagemenu");

exports.run = (client, message, args) => {
  let pMenu = new pageMenu(
    message,
    [
      {
        title: "Help | Commands - Page 1",
        thumbnail: `${client.user.avatarURL}`,
        color: "66cdaa", // green
        footer: "coded by gonzo#3813",
        fields: [
          {
            name: "ping",
            value: "Returns latency and websocket ping.",
            inline: true
          },
          {
            name: "info",
            value:
              "Returns info about the bot, including uptime and a user count.",
            inline: true
          },
          {
            name: "help",
            value: "Returns information about bot commands.",
            inline: true
          },
          {
            name: "bugreport",
            value:
              "Submit a bug report for review. Example: >bugreport (reason).",
            inline: true
          },
          {
            name: "warn",
            value: "Warns a user. Available to those able to kick users.",
            inline: true
          }
        ]
      },
      {
        title: "Help | Commands - Page 2",
        thumbnail: `${client.user.avatarURL}`,
        color: "66cdaa", // green
        footer: "coded by gonzo#3813",
        fields: [
          {
            name: "ban",
            value: "Bans a user. Available to those able to ban users.",
            inline: true
          },
          {
            name: "unban",
            value: "Unban a user. Available to those able to ban users.",
            inline: true
          },
          {
            name: "kick",
            value: "Kicks a user. Available to those able to kick users.",
            inline: true
          },
          {
            name: "tempmute",
            value: "Mute a user for a specified amount of time.",
            inline: true
          },
          {
            name: "purge",
            value:
              "Deletes a specified amount of messages. Available to those able to delete messages.",
            inline: true
          }
        ]
      },
      {
        title: "Help | Commands - Page 3",
        thumbnail: `${client.user.avatarURL}`,
        color: "66cdaa", // green
        footer: "coded by gonzo#3813",
        fields: [
          {
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
            value:
              "Softban a user, deleting messages from them for 7 days, then allowing them to immediately rejoin. Available to those able to ban users.",
            inline: true
          }
        ]
      }
    ],
    {
      duration: 60000,
      expireFunction: function(msg) {
        msg.delete();
      }
    }
  );

  pMenu.run();
};
