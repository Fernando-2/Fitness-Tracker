const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const logger = require("morgan");

const app = express();

app.use(logger("dev"));

PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/dbExample",
{useNewUrlParser: true,useUnifiedTopology: true, useCreateIndex: true});

app.use(express.static("public"))

//API ROUTES
app.post("/api/workouts");
app.put("/api/workouts/:id");
app.get("/api/workouts/range");//(last 7 days) limit 7
//HTML ROUTES
app.get("/",(req, res)=>{
    res.sendFile(path.join(__dirname,"public/index.html"));
});

app.get("/exercise",(req, res)=>{
    res.sendFile(path.join(__dirname,"public/exercise.html"));
});

app.get("/stats",(req, res)=>{
    res.sendFile(path.join(__dirname,"public/stats.html"));
});


app.listen(PORT, ()=>{
    console.log(`App is running on http://localhost:${PORT}`);
});