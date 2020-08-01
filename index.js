const Discord = require('discord.js');
const bot = new Discord.Client();
const prefix = '!';

bot.on('ready', () =>{
    console.log('This bot is online');
    bot.user.setActivity('over server', { type: "WATCHING"})
        .then(presence => console.log('Activity set to ${presence.activities[0].name}'))
        .catch(console.error);
    bot.user.setStatus('dnd')
        .then(console.log)
        .catch(console.error);
})

bot.on("message", message => {
   if(message.author.bot) return;

   const args = message.content.slice(prefix.length).trim().split(/ +/g);
   const command = args.shift().toLocaleLowerCase();
   if (command === 'Hello') {
       const testEmbed = new Discord.RichEmbed()
           .setColor(0x6509ed)
           .setTitle('Test Embed')
           .setDescription('Testing embed')
           .setAuthor(message.author.username)
           .addField('This embed works maybe')
           .setThumbnail(message.author.avatarURL)
           .setFooter('This embed was created by Niko')
           .setTimeStamp()
        try {
            message.reply(testEmbed);
        } catch {
            message.reply(`Sorry <@${msg.author.username}> I cannot respond to your command at the moment.`)
        }
    }
})

bot.login(process.env.token);