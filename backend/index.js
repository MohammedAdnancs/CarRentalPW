const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv").config();
const cookieParser = require('cookie-parser')

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}))

let port = process.env.port;
let connection_string = process.env.connection_string;

mongoose
    .connect(connection_string, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() =>
        app.listen(port, () =>
            console.log(`Server is running at : http://localhost:${port}`)
        )
    )
    .catch((error) => console.error(error));

app.use('/', require('./routes/authRoutes'))