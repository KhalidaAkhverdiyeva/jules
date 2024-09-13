const express = require('express');
const app = express();
const port = 3000;
const connectDB = require("./db/dbserver");
const path = require("path");
const blogRouter = require("../back-side/routes/blogRoutes")
const dotenv = require('dotenv')

dotenv.config()


app.use(express.json());
app.use("/api/v1/blogs", blogRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

const url = process.env.CONNECTION_URL.replace("<db_password>", process.env.PASSWORD)
connectDB(url)

