const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

//Creating ontrack database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

// db.User.create({ name: "Ernest Hemingway" })
//   .then(dbUser => {
//     console.log(dbUser);
//   })
//   .catch(({ message }) => {
//     console.log(message);
//   });

// app.get("/stats", (req, res) => {
//   db.Workowt.find({})
//     .then(dbNote => {
//       res.json(dbNote);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

app.get("/api/workouts", (req, res) => {
  db.Workowt.find({})
    .then(dbWorkout => {      
      res.json(dbWorkout);
      console.log(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});


app.get("/api/workouts/range", (req, res) => {
  db.Workowt.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
      //console.log(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

app.post("/api/workouts", ({ body }, res) => {
  db.Workowt.create(body)
    .then(({ _id }) => db.Workowt.insertOne(body))
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});





// app.post("/api/workouts", ({ body }, res) => {
//   db.Workowt.create(body)
//     .then(({ _id }) => db.Workowt.findOneAndUpdate({}, { $push: { workowts: _id } }, { new: true }))
//     .then(dbWorkout => {
//       res.json(dbWorkout);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

app.put("/api/workouts/:id", ({ params }, res) => {
  db.Workowt.findOneAndUpdate(
    {
      _id: params.id
    },
    {
      $set: {
        type: params.type,
        name: params.name,  
        weight: params.weight,
        sets: params.sets,
        reps: params.reps,
        duration: params.duration,
        distance: params.distance   
      }
    },

    (error, edited) => {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        console.log(edited);
        res.send(edited);
      }
    }
  );
});




app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
