const Discord = require('discord.js');
const client = new Discord.Client()

const config = require('./config.json')
const command = require('./Command')

client.on('ready', () =>{
    console.log('This bot is online');

    command(client, ['ping', 'test'], (message) => {
        message.channel.send('Pong!')
    })
})

client.login(process.env.token);