const express = require("express");
const morgan = require("morgan");
const app = express();
const routes = require("./routes/tasks");
const mongoose = require("mongoose");

//Settings
app.set("port", process.env.PORT || 3000);

//Database
mongoose.connect('mongodb://localhost/mevn-database' , {useNewUrlParser: true})
.then(db => console.log('Connection established'))
.catch(err => console.log(err))

//Middlewares

app.use(morgan("dev"));
app.use(express.json());

//Routes
app.use("/tasks", routes);

//Static files
app.use(express.static(__dirname + "/public"));

app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
