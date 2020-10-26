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