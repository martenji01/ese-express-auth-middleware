//1) USER
// require the express module
import _ from 'lodash';
//3) install JWT
import jwtVerify from '../../services/jwt/index.js';
import { Router } from 'express';
import { db } from '../../services/db/fakedb.js'

const router = new Router();

//2) USE _.omit 'password' in GET
router.get("/" , jwtVerify, function (request, response) {
    return response.json(_.map(db.users.list(), (user) => _.omit(user, 'password')));
});

router.get("/:id", function (request, response) {
  const element = db.users.get(request.params.id)
  return element ? response.json(element) : response.sendStatus(404);
});

router.post("/", function (request, response) {
  db.users.insert(request.body);
  return response.sendStatus(201);
});

router.put("/:id", function (request, response) {
  db.users.update(request.params.id, request.body);
  const element = _.find(db.users.list(), (user) => user.id.toString() === request.params.id)
  return element ? response.json(element) : response.sendStatus(404);
});

router.delete("/:id", function (request, response) {
  db.users.delete(request.params.id);
  return response.sendStatus(204);
});

export default router;