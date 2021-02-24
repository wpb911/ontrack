const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const mongojs = require("mongojs");

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

//Creating ontrack database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });

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
  db.Workowt.find().sort({_id:-1}).limit(7)
    .then(dbWorkout => {
      res.json(dbWorkout);
      //console.log(dbWorkout);
    })
    .catch(err => {
      res.json(err);
    });
});

// app.put("/api/workouts", ({ body }, res) => {
//   db.Workowt.create(body)
//     .then(({ _id }) => db.Workowt.insertOne(body))
//     .then(dbWorkout => {
//       res.json(dbWorkout);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });




app.post('/api/workouts',(req,res)=>{  
  db.Workowt.create(req.body,(error,data)=>{
    if (error) {console.log(error);}
    else {console.log(data);
          res.json(data)
    }
  })
});

// app.get('/api/workouts', async (req,res)=>{  
//   const result = await db.Workowt.find({});
//   res.json(result);

app.put("/api/workouts/:id", ( req, res) => {
  db.Workowt.updateOne(
    //const id = req.params.id;
    {
      _id:mongojs.ObjectId(req.params.id)
    },
    {
      $push:{exercises:req.body}
      
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

// app.get('/api/workouts/range',async  (req,res)=>{
//   const result = await db.Workowt.find().sort({_id:-1}).limit(7);
//   res.json(result);
// })


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
