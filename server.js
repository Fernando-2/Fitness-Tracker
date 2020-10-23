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
app.post("/api/workouts", function (req, res) {
    console.log("creating new workout")
    console.log("req.body is : ", req.body)
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
        })
})


//put  /api/workouts/:id
// app.put("/api/workouts/:id", jsonParser, function (req, res) {
app.put("/api/workouts/:id", ({ body, params }, res) => {
    //     console.log("updating workout data")
    console.log("put req.params.id: ", params.id)
    console.log("put req.body: ", body)
    db.Workout.findByIdAndUpdate(params.id,
        { $push: { exercises: body } },
        { new: true, runValidators: true }
    )
        .then(data => res.json(data))
        .catch(err => {
            res.json(err)
        })
});




//get  /api/workouts/ get all workouts
app.get("/api/workouts", function (req, res) {
    // console.log("the req.body is: ", req.body)

    db.Workout.find({

    })
        .then(data => res.json(data))
        .catch(err => {
            res.json(err)
        })

})


//get  /api/workouts/range (last 7 days: limit 7)
app.get("/api/workouts/range", function (req, res) {
    // console.log("the req.body is: ", req.body)

    db.Workout.find({})
        .then(data => res.json(data))
        .catch(err => {
            res.json(err)
        })

})
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