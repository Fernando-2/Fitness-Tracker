const db = require("../models");
module.exports = function (app) {
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
}