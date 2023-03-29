const express = require("express");
const app = express();

const authRouter = require("./routers/authRouter");
const postRouter = require("./routers/postRouter");

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/", authRouter);
app.use("/", postRouter);

module.exports = app;