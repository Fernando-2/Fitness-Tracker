const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const logger = require("morgan");
const db = require("./models");
const app = express();

app.use(logger("dev"));

PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout",
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

app.use(express.static(path.join(__dirname, "public")));
//API ROUTES
const db = require("../models");
module.exports = function (app) {
    app.post("/api/workouts", function (req, res) {
        const workout = req.body;
        workout.exercises = [{
            type: req.body.type,
            name: req.body.name,
            distance: req.body.distance,
            duration: req.body.duration,
            weight: req.body.weight,
            sets: req.body.sets,
            reps: req.body.reps
        }]
        db.Workout.create({})
            .then(data => res.json(data))
            .catch(err => {
                console.log(err)
            });
    });
    app.put("/api/workouts/:id", ({ body, params }, res) => {
        db.Workout.findByIdAndUpdate(params.id,
            { $push: { exercises: body } },
            { new: true, runValidators: true }
        )
            .then(data => res.json(data))
            .catch(err => {
                res.json(err)
            });
    });
    app.get("/api/workouts", function (req, res) {
        db.Workout.find({
        }).then(data => res.json(data))
        .catch(err => {
        res.json(err)
            });
    
    });
    app.get("/api/workouts/range", function (req, res) {
        db.Workout.find({})
            .then(data => res.json(data))
            .catch(err => {
                res.json(err)
            });
    
    });
}

//HTML ROUTES kept receiving error that public folder wasn't in routes put public in routes then css broke will figure out problem later
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "public/exercise.html"));
});

app.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "public/stats.html"));
});



app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`);
});