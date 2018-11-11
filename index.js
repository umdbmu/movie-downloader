'use strict'
const Botkit = require('botkit');

const controller = Botkit.slackbot({
    debug: false
});

controller.spawn({
    token: process.argv[2],
    retry: true
}).startRTM(function (err) {
    if (err) {
        throw new Error(err);
    }
});

controller.hears('<(https?://.*)>', ['direct_message', 'direct_mention', 'mention'], (bot, message) => {
    let url = message.match[1] + '';
    const execSync = require('child_process').exec;
    const result = execSync(`youtube-dl ${url} -o '%(id)s.%(ext)s'`,
        { maxBuffer: 400 * 1024 },
        (error, stdout, stderr) => {
            if (error != null) {
                bot.reply(message, 'download failed!');
                console.log(error);
            }
        });
});
