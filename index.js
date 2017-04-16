const Botkit = require('botkit');
const fs = require('fs');

if (!process.env.token) {
    console.log('Error: Specify token in environment');
    process.exit(1);
}

const controller = Botkit.slackbot({
    debug: false
});

controller.spawn({
    token: process.env.token,
    retry: true
}).startRTM(function (err) {
    if (err) {
        throw new Error(err);
    }
});

controller.hears('<(https?://.*)>', ['direct_message', 'direct_mention', 'mention'], (bot, message) => {
    let url = message.match[1] + '';
    const execSync = require('child_process').execSync;
    const result = execSync(`youtube-dl ${url}`);
    bot.reply(message, "hi!");
});

controller.on('file_share', function (bot, message) {
    if (message.text.match(/kwsk/)) {
        return;
    }
    'use strict';
    const co = require('co');
    const request = require('request');
    const channelID = message.channel;
    const token = process.env.token;

    bot.reply(message, '川嵜化計画開始');
    co(function* () {
        try {
            const fileInfo = message.file;
            const content = yield download(fileInfo.url_private_download, token);
            fs.writeFileSync('input/input.jpg', content, 'binary');
            const execSync = require('child_process').execSync;
            const result = execSync('python face_swap.py');
            const messageObj = {
                file: fs.createReadStream('./output/kwsk.jpg'),
                filename: 'kwsk.jpg',
                title: '',
                channels: message.channel
            };

            bot.api.files.upload(messageObj, function (err, res) {
                if (err) {
                    console.log(err);
                }
            });
            fs.unlinkSync('input/input.jpg');
            fs.unlinkSync('output/kwsk.jpg');
        } catch (e) {
            throw new Error(e);
        }
    }).then(function () {
        // bot.reply(message, '川嵜化計画'); //成功時の返信
    }).catch(function (e) {
        console.log(e);
        bot.reply(message, '川嵜化計画失敗'); //失敗時の返信
    });

    function download(url, token) {
        return new Promise(function (resolve, reject) {
            request({
                method: 'get',
                url: url,
                encoding: null,
                headers: {
                    Authorization: "Bearer " + token
                }
            }, function (error, response, body) {
                if (error) {
                    reject(error);
                } else {
                    resolve(body);
                }
            })
        });
    }
});