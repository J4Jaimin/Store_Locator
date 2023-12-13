const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");


// load env variables.
dotenv.config({ path: "./config/config.env" });

// database connection.
connectDB();

const app = express();

const PORT = process.env.PORT || 3000;

// body parser
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// enable cors
app.use(cors());

// routes
app.use("/api/v1/stores", require("./routes/stores"));

app.use("/api/key", require("./routes/apikeyforclientside"));

// add static folder for frontend
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENVIRONMENT} mode on port ${PORT}.`);
});