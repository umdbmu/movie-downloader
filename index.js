'use strict'
let {
    Botkit
} = require('botkit');
const {
    SlackAdapter,
    SlackMessageTypeMiddleware
} = require('botbuilder-adapter-slack');

const adapter = new SlackAdapter({
    clientSigningSecret: process.env.ClientSigningSecret,
    botToken: process.env.BotToken
});
adapter.use(new SlackMessageTypeMiddleware());

const controller = new Botkit({
    adapter: adapter,
});

controller.on('slash_command', function (bot, message) {

    bot.replyPublic(message, 'Everyone can see this part of the slash command');
    bot.replyPrivate(message, 'Only the person who used the slash command can see this.');

    console.log(message);
    // TOOD: ダウンロード処理の開始
    const execSync = require('child_process').exec;
    const result = execSync(`youtube-dl ${message.text} -o '%(id)s.%(ext)s'`, {
            maxBuffer: 400 * 1024
        },
        (error, stdout, stderr) => {
            if (error != null) {
                bot.replyPrivate(message, 'download failed!');
                console.log(error);
            } else {
                bot.replyPrivate(message, 'download finish!');
            }
        });
})

controller.on('bot_message', function(bot, message) {
    // console.log(message);
    var url = message.incoming_message.channelData.text.split(/\n/)[1];
    url = url.replace('<', '').replace('>', '');
    var id = message.incoming_message.id

    console.log(url);
    console.log(id);

    const execSync = require('child_process').exec;
    const result = execSync(`youtube-dl --skip-download ${url} -o '${id}_%(id)s.%(ext)s' --write-all-thumbnails`, {
            maxBuffer: 400 * 1024
        },
        (error, stdout, stderr) => {
            if (error != null) {
                // bot.replyPrivate(message, 'download failed!');
                console.log(error);
            } else {
                // bot.replyPrivate(message, 'download finish!');
            }
        });
});