const config = require('../config.json');
module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
        console.log(`
 _____                _       _ 
|  __ \\              | |     | |
| |__) |___  __ _  __| |_   _| |
|  _  // _ \\/ _\` |/ _\` | | | | |
| | \\ \\  __/ (_| | (_| | |_| |_|
|_|  \\_\\___|\\__,_|\\__,_|\\__, (_)
                         __/ |  
                        |___/   
        `);
        console.log("/-/-/-/       Celery Bot       /-/-/-/")
        console.log("/-/-/-/          Cut           /-/-/-/")
		client.user.setPresence({ activities: [{ name: config.status.text, type: config.status.type }], status: config.status.online });
	},
};