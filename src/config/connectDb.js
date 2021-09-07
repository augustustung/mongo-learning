import mongoose from 'mongoose'

const connectDb = async () => {
    try {
        await mongoose.connect('mongodb://localhost/testRelationship', { useNewUrlParser: true, useUnifiedTopology: true })
        console.log('Connection has been established successfully.');
    } catch (e) {
        console.error('Unable to connect to the database:', e);
    }
}

module.exports = connectDb;