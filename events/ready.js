const chalk = require('chalk');
const say = require('say')
const n = require('../n.json');
const human = require("humanize");
let time = new Date();
function amPm() {
  if (time.getHours() >= 11) {
    return "PM";
  } else return "AM";
}
module.exports = client => {
  console.log(chalk.bgGreen.black(n.name + " is ready at " + human.date('m-d-y | h:i:s', client.readyAt) + " " + amPm() + ". Version " + n.version + ". Prefix: " + n.prefix + "."));
  client.user.setStatus('online');
  client.user.setActivity('>help');
}
