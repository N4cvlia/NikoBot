module.exports =  client => {
    const channelId = '739811773393141820' // welcome channel
    const targetChannelId = '736895174034063438' // rules

    client.on('guildMemberAdd', member => {
        console.log(member)

        const message = `Welcome <@${
            member.id
        }> To The Server! Check out ${member.guild.channels.cache
            .get(targetChannelId)
            .toString()}`

        const channel = member.guild.channels.cache.get(channelId)
        channel.send(message)
    })
}