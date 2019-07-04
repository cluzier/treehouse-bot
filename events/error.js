const chalk = require('chalk');
const n = require('../n.json');
const human = require("humanize");
module.exports = (client, error) => {
  console.log(chalk.bgRed(error));
}
