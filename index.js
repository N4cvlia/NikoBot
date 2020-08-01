const Discord = require('discord.js');
const client = new Discord.Client()

const config = require('./config.json')
const command = require('./Command')

client.on('ready', () =>{
    console.log('This bot is online');

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
  command(client, 'embed', (message) => {
      const embed = new Discord.MessageEmbed().setTitle('Example text embed')

    message.channel.send(embed)
  })
})

client.login(process.env.token);