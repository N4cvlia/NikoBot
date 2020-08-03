const Discord = require('discord.js');
const client = new Discord.Client()

const config = require('./config.json')
const command = require('./Command')
const poll = require('./poll')

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
    const { guild } = message
    console.log(guild)

    const { name, region, memberCount, owner, afkTimeout } = guild
    const icon = guild.iconURL()

    const embed = new Discord.MessageEmbed()
      .setTitle(`Server info for "${name}"`)
      .setThumbnail(icon)
      .setColor('#FF0000')
      .addFields(
      {
        name: 'Region',
        value: region,
      },
      {
        name: 'Members',
        value: memberCount,
      },
      {
        name: 'Owner',
        value: owner.user.tag,
      },
      {
        name: 'AFK Timeout',
        value: afkTimeout / 60,
      }
    )

    message.channel.send(embed)  
  })
  command(client, 'help', (message) => {
    message.channel.send(`
These are my supported commands:

**!help** - Displays the help menu
**!Status** - Changes bots Bio
**!ping** - Bot replys with Pong!
**!serverinfo** - Displays server info
**!clearchannel** - Clears the Channel chat
 `)
  })

  const { prefix } = config
  
  client.user.setPresence({
    activity: {
      name: `"${prefix}help" for help`,
    }
  })
  command(client, 'ban', message => {
    const { member, mentions} = message

    const tag = `<@${member.id}>`

    if (
      member.hasPermission('ADMINISTRATOR') || 
      member.hasPermission('BAN_MEMBERS') 
    ) {
      const target = mentions.users.first()
      if (target) {
        const targetMember = message.guild.members.cache.get(target.id)
        targetMember.ban()
        message.channel.send(`${tag} That user has been banned.`)
      } else {
        message.channel.send(`${tag} Please specify someone to ban.`)
      }
    } else {
      message.channel.send(
        `${tag} You do not have permission to use this command.`
      )
    }    
  })

  command(client, 'kick', message => {
    const { member, mentions} = message

    const tag = `<@${member.id}>`

    if (
      member.hasPermission('ADMINISTRATOR') || 
      member.hasPermission('KICK_MEMBERS') 
    ) {
      const target = mentions.users.first()
      if (target) {
        const targetMember = message.guild.members.cache.get(target.id)
        targetMember.kick()
        message.channel.send(`${tag} That user has been Kicked.`)
      } else {
        message.channel.send(`${tag} Please specify someone to kick.`)
      }
    } else {
      message.channel.send(
        `${tag} You do not have permission to use this command.`
      )
    }    
  })
  poll(client)
})

client.login(process.env.token);