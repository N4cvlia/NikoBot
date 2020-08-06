const mongoose = require('mongoose')
const config = require('./config.json')
mangoose.connect(process.env.MONGOLAB_URI)

module.exports = async () => {
    await mongoose.connect(MONGOLAB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,  
    })
    return mongoose
}