//scrivere un middleware per express che effettua il check negli header che la chiamata presenti un jwt valido. preferibilmente metterlo nei service
//- nel middleware controllare che esista un utente con l'id contenuto nel JWT
// var decoded = jwt.verify(request.headers.authorization.split(" ")[1], 'secret');
//- se il jwt è valido proseguire con lo step successivo del middleware

import jwt from 'jsonwebtoken'
import _ from 'lodash'
import { db } from '../db/fakedb.js'

export default function jwtVerify(request, response, next) {
    try {
        var decoded = jwt.verify(request.headers.authorization.split(" ")[1], 'cherry');
        const searchUser = _.find(db.users.list(), (user) => user.id.toString() === decoded.user.id.toString())
        console.log({ searchUser })
        if (searchUser) {
            request.user = searchUser;
            next();
        } else {
            response.sendStatus(401)
        }
    } catch (e) {
        console.error(e)
        response.sendStatus(401)
    }
}