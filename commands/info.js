const human = require('humanize');
const bytes = require('pretty-bytes');
const Discord = require('discord.js');
const n = require('../n.json');

exports.run = (client, message, args) => {
  if(message.author.bot) return;
  function msToTime(duration) {
      var milliseconds = parseInt((client.uptime%1000)/100), seconds = parseInt((client.uptime/1000)%60), minutes = parseInt((client.uptime/(1000*60))%60), hours = parseInt((client.uptime/(1000*60*60))%24), days = parseInt((client.uptime/(1000*60*60*24))%31);
      days = (days < 10) ? "0" + days : days;
      hours = (hours < 10) ? "0" + hours : hours;
      minutes = (minutes < 10) ? "0" + minutes : minutes;
      seconds = (seconds < 10) ? "0" + seconds : seconds;
      return days + ":" + hours + ":" + minutes + ":" + seconds + "." + milliseconds;
  }
  function randomColor() {
    var colors = ["#00F5FF", "#7FFFD4", "#008B45", "#FFD700", "#FF8000", "#FF0000", "#7FFF00", "#00BFFF", "	#000080", "#8A2BE2", "#FFB5C5", "#00FFF7", "#B120DF", "#DF2057", "#FFFFFF", "#B2FF00"];
    var colorNum = Math.floor(Math.random()*colors.length);
    return colors[colorNum];
  }
  let time = new Date();
  function amPm() {
    if (time.getHours() >= 11) {
      return "PM";
    } else return "AM";
  }
  var embed = new Discord.RichEmbed()
  .setTitle("Bot Information")
  .setDescription("Information for " + n.name)
  .setThumbnail(`${client.user.avatarURL}`)
  .setAuthor(message.author.username + "#" + message.author.discriminator, `${message.author.avatarURL}`)
  .setColor(randomColor())
  .addField("Total Users Serving",
    client.users.size, true)
  .addField("Uptime",
    msToTime(), true)
  .addField("Ready At",
    `${human.date('m-d-y | h:i:s', client.readyAt)} ${amPm()}`, true)
  .addField("Memory Usage",
    `Using ${bytes(process.memoryUsage().rss)}`, true)
  .addField("Nitro Boosters",
    "Chris Hansenᶠʳᵒᵐ ᴰᵃᵗᵉˡⁱⁿᵉ ᴺᴮᶜ#2020 \n Krymena#0001 \n 𝒥𝑒𝓁𝓁𝒾~#0666  \n MustardPie#9999 \n tyler#7157 \n StreetCorner#9082 \n stickilas#1188 \n ada#0690 \n ZkyliHokageXX#7015 \n Distilled Delusion#2494", true)
  .addField("Total Guilds Serving",
    `${client.guilds.size}`, true)
  .addField("Version",
    `${n.version}`)
  .setFooter("coded by gonzo#3813")
  .setTimestamp()
  message.channel.send(embed);
  };
