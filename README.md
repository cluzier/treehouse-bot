# treehouse-bot

![GitHub issues](https://img.shields.io/github/issues/cluzier/treehouse-bot)
![Github forks](https://img.shields.io/github/forks/cluzier/treehouse-bot)
![Github stars](https://img.shields.io/github/stars/cluzier/treehouse-bot)
![Github license](https://img.shields.io/github/license/cluzier/treehouse-bot)
[![HitCount](http://hits.dwyl.io/cluzier/treehouse-bot.svg)](http://hits.dwyl.io/cluzier/treehouse-bot)

## About

A discord bot made for the Treehouse Server, it's main functionalities include:
```
* Ban
* Kick
* Lockdown
* Warn
* Mute
```
These are only a few of the commands.

## Installation

Do in order:

`$ git clone https://github.com/cluzier/treehouse-bot`

`cd treehouse-bot`

`npm i`

Create a file `n.json` in root directory, copy and paste the below code into it and save,

```
{
    "name": "Treehouse-bot",
    "token": "bot token here",
    "oID": "owner id",
    "prefix": ">",
    "version": "1.0.3",
    "log_channel": "change this to your mod-logs channel"
}
```

`node index.js`

## Contribute

Clone and mix up things. If you think your edits are interesting for the public, just open a new pull request on that.

## Folder Structure

```
treehouse-bot
├─── assets
│   └─── guildsettings.sqlite
│
├─── commands # Houses commands
│   ├── ban.js
│   ├── bugreport.js
│   ├── devhelp.js
│   ├── eval.js
│   ├── giverole.js
│   ├── help.js
│   ├── hug.js
│   ├── info.js
│   ├── kick.js
│   ├── kill.js
│   ├── lockdown.js
│   ├── meme.js
│   ├── mock.js
│   ├── ping.js
│   ├── purge.js
│   ├── serverinfo.js
│   ├── shutdown.js
│   ├── tempmute.js
│   ├── unban.js
│   ├── userinfo.js
│   ├── warn.js
│   └── warnlvl.js
│
├─── events
│   ├── disconnect.js
│   ├── error.js
│   ├── message.js
│   ├── ready.js
│   └── reconnecting.js
│
├─── util
│   └── eventLoader.js
│
├─── .DS_Store
├─── .env
├─── .gitignore
├─── CODE_OF_CONDUCT.md
├─── LICENSE
├─── 
├─── hugged.json
├─── index.js
├─── killed.json
├─── package.json
├─── package-lock.json
├─── procfile
├─── README.md
├─── wallpaper.png
└─── warnings.json
```

## Required tools for development:

* NodeJS

* NPM

## Credits

A project by [Conner Luzier](https://github.com/cluzier).
Other amazing contributors [here](https://github.com/cluzier/treehouse-bot/graphs/contributors).
