const mongoose = require('mongoose');

async function connectDB(url) {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Database connected");
    } catch (err) {
        console.error("Database connection error:", err);
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected");
});

module.exports = connectDB;
