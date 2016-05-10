var restify = require('restify');
var builder = require('botbuilder');

var wisdoms = [ "Wisdom1", "Wisdom2" ];

// Create bot and add dialogs
var bot = new builder.BotConnectorBot({ 
    appId: process.env.BOTFRAMEWORK_APPID, 
    appSecret: process.env.BOTFRAMEWORK_APPSECRET 
});

bot.add('/', function (session) {
    if (session.message.text.match(/(father|отец)/i)) {
        // Get random wisdom from Father
        var rand = wisdoms[Math.floor(Math.random() * wisdoms.length)];
        return session.send(rand);
    }
    else {
        // .send() broke emulator, need to find workaround
        return session.send("Empty message");
    }
});

// Setup Restify Server
var server = restify.createServer();
server.post('/api/messages', bot.verifyBotFramework(), bot.listen());
// Serve a static web page
server.get(/.*/, restify.serveStatic({
	'directory': '.',
	'default': 'index.html'
}));

server.listen(process.env.port || 3978, function () {
    console.log('%s listening to %s', server.name, server.url); 
});