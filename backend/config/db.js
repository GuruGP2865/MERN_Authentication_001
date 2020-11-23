const mongoose = require("mongoose");

const connnectDB = async () => {
    const connection = await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    })
    console.log(`MongoDB Connected : ${connection.connection.host}`);
}

module.exports = connnectDB;