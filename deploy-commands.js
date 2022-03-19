const { Client, Intents } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
require('dotenv').config();

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

const commands = [
	new SlashCommandBuilder().setName('enable').setDescription('Enable captcha reminder'),
	new SlashCommandBuilder().setName('disable').setDescription('Disable captcha reminder'),
	new SlashCommandBuilder().setName('milico').setDescription('Activate milico\'s farm reminder').addIntegerOption(option => option.setName('minutes').setDescription('Enter the minutes to override the reminder').setRequired(false)),
	new SlashCommandBuilder().setName('m').setDescription('Activate milico\'s farm reminder').addIntegerOption(option => option.setName('minutes').setDescription('Enter the minutes to override the reminder').setRequired(false))
].map(command => command.toJSON());


const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);