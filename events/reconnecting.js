const chalk = require('chalk');
const n = require('../n.json');
const human = require("humanize");
module.exports = client => {
  var ToD = new Date();
  function amPm() {
    if (ToD.getHours() >= 11) {
      return "PM";
    } else return "AM";
  }
  console.log(chalk.bgGreen.black("Client reconnect occured at " + human.date('m-d-y | h:i:s', new Date()) + amPm() + "."));
}
