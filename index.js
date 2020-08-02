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
      const logo = 'https://cdn.shopify.com/s/files/1/1737/1965/products/image_21_600x600.png?v=1569129911'

      const embed = new Discord.MessageEmbed()
      .setTitle('Example text embed')
      .setURL('https://www.youtube.com/watch?v=lm5o50ICyMQ')
      .setAuthor(message.author.username)
      .setThumbnail(logo)
      .setFooter('Dis is a Epic footer', logo)
      .setColor('#FF0000')
      .addFields({
        name: 'Amdydyd',
        value: 'Bleeds only 1 liters',
        inline: true
    },{
        name: 'Field 2',
        value: 'Hello world',
        inline: true
    },{
        name: 'Field 3',
        value: 'Hello world',
        inline: true
    },{
        name: 'Field 4',
        value: 'Hello world',
        inline: true
    },{
        name: 'Field 5',
        value: 'Hello world',
        inline: true
    })

    message.channel.send(embed)
  })
  command(client, 'serverinfo', message => {
    message.channel.send('Coming soon')
  })
})

client.login(process.env.token);