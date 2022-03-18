// require the express module
import _ from 'lodash'
import { Router } from 'express';
import { db } from '../../services/db/fakedb.js'
import jwt from 'jsonwebtoken'

const router = new Router();

router.post("/login", function (request, response) {
  //console.log(request.headers)
  const decoded = Buffer.from(request.headers.authorization.split(" ")[1], 'base64').toString('binary');
  console.log({decoded});
  const foundUser = _.find(db.users.list(),(user)=>
  user.username === decoded.split(":")[0]
  & user.password === decoded.split(":")[1]);
  
  if(foundUser){
    const thisUserToken = jwt.sign({user: { id: foundUser.id }}, 'cherry');
    return response.json({thisUserToken});
  }
  else{
    response.status(401);
    response.send("No login!");
  }
});

export default router;