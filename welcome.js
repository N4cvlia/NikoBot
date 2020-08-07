const mongo = require('./mongo')
const command = require('./Command')
const welcomeSchema = require('./schemas/welcome-schema')
const { connection } = require('mongoose')

module.exports =  client => {
    //!setwelcome <command>

    command(client, 'setwelcome', async (message) => {
        const { member, channel, content, guild } = message

        if (!member.hasPermissions('ADMINISTRATOR')) {
          channel.send('You do not have permission to run this command.')
          return
        }

        await mongo().then(async (mongoose) => {
            try {
              await new welcomeSchema({
                  _id: guild.id,
                  channelId: channel.id,
                  text: content
              }).save()
            } finally {
                mongoose.connection.close()
            }
        })
    })
}