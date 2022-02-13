// require the express module
import _ from 'lodash'
import { Router } from 'express';
import { db } from '../../services/db/fakedb.js'

const router = new Router();

router.get("/", function (request, response) {
  return response.json(db.items.list());
});

router.get("/:id", function (request, response) {
  const element = _.find(db.items.list(), (i) => i.id.toString() === request.params.id)
  return element ? response.json(element) : response.sendStatus(404);
});

router.post("/", function (request, response) {
  db.items.insert(request.body);
  return response.sendStatus(201);
});

router.put("/:id", function (request, response) {
  db.items.update(request.params.id, request.body);
  const element = _.find(db.items.list(), (i) => i.id.toString() === request.params.id)
  return element ? response.json(element) : response.sendStatus(404);
});

router.delete("/:id", function (request, response) {
  db.items.delete(request.params.id);
  return response.sendStatus(204);
});

export default router;