require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");
const PORT = 3000;
mongoose.connect(process.env.DATABASE_URL)
.then(()=> console.log("Connected to DB..."))
.catch(()=> console.log("Error while connecting to DB..."))

app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}...`);
})