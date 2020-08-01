const Discord = require('discord.js');
const client = new Discord.Client()

const config = require('./config.json')
const firstMessage = require('./first-message')
const command = require('./Command')

client.on('ready', () =>{
    console.log('This bot is online');

    firstMessage(client, '723819742502191165', 'hello world!!!', ['🔥', '🍉'])

    command(client, ['ping', 'test'], (message) => {
        message.channel.send('Pong!')
    })

    command(client, 'servers', message => {
        client.guilds.cache.forEach(guild => {
          message.channel.send(`${guild.name} has a total of ${guild.memberCount} members`
          )
        })
    })

  command(client, ['cc', 'clearchannel'], message => {
    if (message.member.hasPermission('ADMINISTRATOR')){
      message.channel.messages.fetch().then(results => {
        message.channel.bulkDelete(results)
      })
    }
  })

  command(client, 'status', message => {
    const content = message.content.replace('!status ', '')

    client.user.setPresence({
      activity: {
        name: content,
        type: 0,
      },
    })
  })
})

client.login(process.env.token);