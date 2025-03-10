const express = require('express');
const path = require('path');

const app = express();
const PORT = 1034;

const config = require('./config.json');
const fs = require('fs');
const { Client, Collection, GuildMember, Intents } = require('discord.js');

const client = new Client({
    intents: [Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS]
});

app.set('trust proxy', true);

app.get('/', (req, res) => {
   res.json({ success: true, message: "Celery Bot - Cut is online!" }) 
});

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(client, ...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(client, ...args));
	}
}

require('./deploy-commands.js');
client.login(config.token);

app.listen(PORT, () => {
    console.log(`Express started on port ${PORT}`);
});