var os=require('os');
var redis=require('redis');
var client=redis.createClient();

var COMMANDS={};

COMMANDS.DATE=function(){
	var now=new Date();
	console.log('date'+now.toISOString());

};


COMMANDS.PING=function(){
	console.log("PONG");
};

COMMANDS.HOSTNAME=function(){
	console.log('hostname'+os.hostname());
};

client.on('message',function(channel,commandName){
	if (COMMANDS.hasOwnProperty(commandName)){
		var commandFunction=COMMANDS[commandName];
			commandFunction();
	}else{
		console.log('unknown command:'+commandName);
	}
});
client.subscribe('global',process.argv[2]);