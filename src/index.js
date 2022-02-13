// require the express module
import _ from 'lodash'
import express from "express";
import { db } from '../db/fakedb.js'
// create an object from the express function which we contains methods for making requests and starting the server
const app = express();

// NECESSARIO PER LEGGERE IL BODY JSON IN POST E PUT
app.use(express.json());
///////////////////////////////////////////////////


// create a route for a GET request to '/' - when that route is reached, run a function
app.get("/items", function (request, response) {
  return response.json(db.list());
});

app.get("/items/:id", function (request, response) {
  const element = _.find(db.list(), (i) => i.id.toString() === request.params.id)
  return element ? response.json(element) : response.sendStatus(404);
});

app.post("/items", function (request, response) {
  db.insert(request.body);
  return response.sendStatus(201);
});

app.put("/items/:id", function (request, response) {
  db.update(request.params.id, request.body);
  const element = _.find(db.list(), (i) => i.id.toString() === request.params.id)
  return element ? response.json(element) : response.sendStatus(404);
});

app.delete("/items/:id", function (request, response) {
  db.delete(request.params.id);
  return response.sendStatus(203);
});


// let's tell our server to listen on port 3000 and when the server starts, run a callback function that console.log's a message
app.listen(3000, function () {
  console.log(
    "The server has started on port 3000. Head to localhost:3000 in the browser and see what's there!"
  );
});