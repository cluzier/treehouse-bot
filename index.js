require("events").EventEmitter.prototype._maxListeners = 100;
const Discord = require("discord.js");
const client = new Discord.Client();
const Canvas = require('canvas');
const n = require("./n.json");
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

client.on("message", (message) => {

    const responseObject = {
      "so no head": "no " + message.author + ", no head",
      "So no head": "no " + message.author + ", no head",
      "SO NO HEAD": "no " + message.author + ", no head"
    };
  }),

  client.on('message', message => {
  if (message.content === 'dis mi swampie') {
    const exampleEmbed = new Discord.RichEmbed()
	.setTitle('get out mi swamp!')
	.attachFiles(['shrek.png'])

message.channel.send(exampleEmbed);
  }
  }),

  client.on('guildMemberAdd', async member => {
    const applyText = (canvas, text) => {
      const ctx = canvas.getContext('2d');
      let fontSize = 100;

      do {
        ctx.font = `${fontSize -= 10}px sans-serif`;
      } while (ctx.measureText(text).width > canvas.width - 300);

      return ctx.font;
    };
    const channel = member.guild.channels.find(ch => ch.name === 'lounge');
    if (!channel) return;

    const canvas = Canvas.createCanvas(700, 270);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('./wallpaper.png');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.font = '38px sans-serif';
    ctx.fillStyle = '#fff';
    ctx.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5);

    ctx.font = applyText(canvas, `${member.displayName}!`);
    ctx.fillStyle = '#fff';
    ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.5);

    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
    ctx.drawImage(avatar, 25, 25, 200, 200);

    const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome-image.png');

    channel.send(`Welcome to the server, ${member}!`, attachment);
  });

//  client.on('message', async message => {
//    if (message.content === '.join') {
//      client.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
//    }
// });


exports.reload = reload;
client.login(n.token);