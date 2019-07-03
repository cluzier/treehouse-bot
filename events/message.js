const kick = require("../commands/kick");
const ban = require("../commands/ban");
const purge = require("../commands/purge");

module.exports = (client, message) => {
  if (message.content.startsWith(">ban")) {
    return ban(message);
  }
  if (message.content.startsWith(">kick")) {
    return kick(message);
  }
  if (message.content.startsWith(">purge")) {
    return purge(message);
  }
  if (message.content === '>ping') {
    message.reply('Pong!')
  }
  if (message.content.startsWith('>about')) {
    message.channel.send({
      embed: {
          color: 3447003,
          author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
          },
          title: "About",
          description: "Treehouse-bot coded by gonzo#3813",
          fields: [{
                  name: "Use",
                  value: "This bot is used for moderation purposes only."
              },
              {
                  name: "Shoutouts",
                  value: "Chris Hansen#2020 \n 𝒥𝑒𝓁𝓁𝒾~#0666 \n ayla#5394"
              },
              {
                  name: "Misc",
                  value: "Bears beets battlestar galactica"
              }
          ],
          timestamp: new Date(),
          footer: {
              icon_url: client.user.avatarURL,
              text: "© treehouse-bot"
          }
      }
  });
  }
  if (message.content.startsWith(">help")) {
    message.channel.send({
      embed: {
          color: 3447003,
          author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
          },
          title: "Commands",
          description: "Here is a list of commands Treehouse-bot has to offer",
          fields: [{
                  name: ">help",
                  value: "View this list"
              },
              {
                  name: ">about",
                  value: "View the about section"
              },
              {
                  name: ">kick",
                  value: "Kick someone from the server"
              },
              {
                  name: ">ban",
                  value: "Ban someone from the server"
              },
              {
                name: ">purge",
                value: "Delete messages loaded in chat"
              }
          ],
          timestamp: new Date(),
          footer: {
              icon_url: client.user.avatarURL,
              text: "© treehouse-bot"
          }
      }
  });
  }
};