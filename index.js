const Discord = require('discord.js');
const bot = new Discord.Client();

bot.on('ready', () =>{
    console.log('This bot is online');
})

bot.on('message', msg=>{
   if(msg.content === "Hello"){
       msg.reply('Hello Fellow!');
   }
})

bot.on('message', msg=>{
    if(msg.content === "hello"){
        msg.reply('Hello Fellow!');
    }
 })

 bot.on('message', msg=>{
    if(msg.content === "Niko Big PP"){
        msg.reply('Agreed <3');
    }
 })

bot.login(process.env.token);