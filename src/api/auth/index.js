// require the express module
import _ from 'lodash'
import { Router } from 'express';
import { db } from '../../services/db/fakedb.js'

const router = new Router();

router.post("/login", function (request, response) {
  console.log(request.headers)
  response.sendStatus(200)
});

export default router;