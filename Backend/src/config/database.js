const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, )
        console.log('Database connected successfully');
    }
    catch (error) {
        console.error('Database connection error:', error) // Exit the process with failure
}
}

module.exports = connectDB
