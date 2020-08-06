const mongoose = require('mongoose')
const { mongoPass } = require('./config.json')
const mongoPath = 'mongodb+srv://NikoBot:tanki777@nikobot.phngf.mongodb.net/NikoBot?retryWrites=true&w=majority'

module.exports = async () => {
    await mongoose.connect(mongoPath, {
      useNewUrlParser: true,
      useUnifiedTopology: true,  
    })

    
    return mongoose
}