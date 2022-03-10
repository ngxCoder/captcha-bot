// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const cron = require('node-cron');
require('dotenv').config();

const token = process.env.DISCORD_TOKEN

let enabled = true;
const channelId = '951317145193680917';
const roleId = '951314514261987409';
const timeoutMessage = 300000;

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Captcha Bot Ready!');
});

cron.schedule('28,58 * * * *', () => {
    if(enabled){
        const channel = client.channels.cache.get(channelId)
        for (let i = 0; i < 3; i++) {
            channel.send(`Captcha Time! <@&${roleId}> 🔔 🔔 🔔`)
            .then(msg => setTimeout(() => msg.delete(), timeoutMessage));
        }
    }
    console.warn('Reminding captcha task');
}, {
    scheduled: true,
    timeZone: "America/Lima"
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'enable') {
        enabled = true;
		await interaction.reply({ content: 'Captcha Enabled', ephemeral: true });
	} else if (commandName === 'disable') {
        enabled = false;
		await interaction.reply({ content: 'Captcha Disabled', ephemeral: true });
	}
});


// Login to Discord with your client's token
client.login(token);