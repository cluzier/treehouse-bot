require("events").EventEmitter.prototype._maxListeners = 100;
const Discord = require("discord.js");
const client = new Discord.Client();
const Canvas = require('canvas');
const n = require("./n.json");
const fs = require("fs");
const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');

require("./util/eventLoader")(client);
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

client.on("ready", () => {
  // Check if the table "points" exists.
  const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';").get();
  if (!table['count(*)']) {
    // If the table isn't there, create it and setup the database correctly.
    sql.prepare("CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER, level INTEGER);").run();
    // Ensure that the "id" row is always unique and indexed.
    sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
  }

  // And then we have two prepared statements to get and set the score data.
  client.getScore = sql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");
  client.setScore = sql.prepare("INSERT OR REPLACE INTO scores (id, user, guild, points, level) VALUES (@id, @user, @guild, @points, @level);");
});

client.on("message", message => {
  if (message.author.bot) return;
  let score;
  if (message.guild) {
    score = client.getScore.get(message.author.id, message.guild.id);
    if (!score) {
      score = {
        id: `${message.guild.id}-${message.author.id}`,
        user: message.author.id,
        guild: message.guild.id,
        points: 0,
        level: 1
      }
    }
    score.points++;
    const curLevel = Math.floor(0.1 * Math.sqrt(score.points));
    if (score.level < curLevel) {
      score.level++;
      message.reply(`You've leveled up to level **${curLevel}**! Ain't that dandy?`);
    }
    client.setScore.run(score);
  }
  if (message.content.indexOf(n.prefix) !== 0) return;

  const args = message.content.slice(n.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === "points") {
    return message.reply(`You currently have ${score.points} points and are level ${score.level}!`);
  }

  if (command === "give") {
    // Limited to guild owner - adjust to your own preference!
    if (!message.author.id === message.guild.owner) return message.reply("You're not the boss of me, you can't do that!");

    const user = message.mentions.users.first() || client.users.get(args[0]);
    if (!user) return message.reply("You must mention someone or give their ID!");

    const pointsToAdd = parseInt(args[1], 10);
    if (!pointsToAdd) return message.reply("You didn't tell me how many points to give...")

    // Get their current points.
    let userscore = client.getScore.get(user.id, message.guild.id);
    // It's possible to give points to a user we haven't seen, so we need to initiate defaults here too!
    if (!userscore) {
      userscore = {
        id: `${message.guild.id}-${user.id}`,
        user: user.id,
        guild: message.guild.id,
        points: 0,
        level: 1
      }
    }
    userscore.points += pointsToAdd;

    // We also want to update their level (but we won't notify them if it changes)
    let userLevel = Math.floor(0.1 * Math.sqrt(score.points));
    userscore.level = userLevel;

    // And we save it!
    client.setScore.run(userscore);

    return message.channel.send(`${user.tag} has received ${pointsToAdd} points and now stands at ${userscore.points} points.`);
  }

  if (command === "leaderboard") {
    const top10 = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY points DESC LIMIT 10;").all(message.guild.id);

    // Now shake it and show it! (as a nice embed, too!)
    const embed = new Discord.RichEmbed()
      .setTitle("Leaderboard")
      .setAuthor(client.user.username, client.user.avatarURL)
      .setDescription("Top 10 Leaderboard")
      .setColor(0x00AE86);

    for (const data of top10) {
      embed.addField(client.users.get(data.user).tag, `${data.points} points (level ${data.level})`);
    }
    return message.channel.send({
      embed
    });
  }
});



// client.on('guildMemberAdd', async member => {
//   const applyText = (canvas, text) => {
//     const ctx = canvas.getContext('2d');
//     let fontSize = 100;

//     do {
//       ctx.font = `${fontSize -= 10}px sans-serif`;
//     } while (ctx.measureText(text).width > canvas.width - 300);

//     return ctx.font;
//   };
//   const channel = member.guild.channels.find(ch => ch.name === 'lounge');
//   if (!channel) return;

//   const canvas = Canvas.createCanvas(700, 270);
//   const ctx = canvas.getContext('2d');

//   const background = await Canvas.loadImage('./wallpaper.png');
//   ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

//   ctx.strokeStyle = '#74037b';
//   ctx.strokeRect(0, 0, canvas.width, canvas.height);

//   ctx.font = '38px sans-serif';
//   ctx.fillStyle = '#fff';
//   ctx.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5);

//   ctx.font = applyText(canvas, `${member.displayName}!`);
//   ctx.fillStyle = '#fff';
//   ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.5);

//   ctx.beginPath();
//   ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
//   ctx.closePath();
//   ctx.clip();

//   const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
//   ctx.drawImage(avatar, 25, 25, 200, 200);

//   const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png');

//   channel.send(`Welcome to the server, ${member}!`, attachment);
// });

//  client.on('message', async message => {
//    if (message.content === '.join') {
//      client.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
//    }
// });


exports.reload = reload;
client.login(n.token);