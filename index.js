var dotenv = require('dotenv');
var slackAPI = require('slackbotapi');
dotenv.load();
// Starting

function jBot(slackToken) {

    this.slack = new slackAPI({
        'token': slackToken,
        'logging': true,
        'autoReconnect': true
    });

    this.slack.on('message', this.onSlackMessage.bind(this));
}

jBot.prototype.getChannelName = function(channel) {
    for (var i in this.slack.slackData.groups) {
        if (this.slack.slackData.groups[i].id === channel) {
            var channelName = this.slack.slackData.groups[i].name;
        } else if (this.slack.slackData.channels[i].id === channel) {
            var channelName = this.slack.slackData.channels[i].name;
        }
    }
    return channelName;
}


jBot.prototype.onSlackMessage = function(data) {
    var botName = this.slack.slackData.self.name;

    if (typeof data.text === 'undefined') return;

    this.getChannelName(data.channel);

    function checkMention() {
        return data.text.indexOf('@' + botName > -1);
    };

    if (checkMention()) {
        this.slack.sendMsg('G5VJM76L8', this.slack.getUser(data.user).name + ' wrote: ```' + data.text + " --from " + channelName + "```");
    }

    if (checkMention()) {
        this.slack.sendMsg(data.channel, this.slack.getUser(data.user).name + ', dont fret, jamiebot is on it');
    }
}


var myjBot = new jBot(process.env.KEY);
