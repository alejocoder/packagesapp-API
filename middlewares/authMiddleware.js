import jwt from "jwt-simple"
import moment from "moment/moment.js"
import {createToken, secret} from "../services/jwt.js"

//auth middleware
const authMiddleware = (req, res, next) =>{
    //check the authentication header
    if (req.headers.authorization) {
        return res.status(403).send({
            status: "error",
            message: "la petición no tiene la cabecera de autenticación"
        })
    }
    //clean token
    let token = req.header.authorization.replace(/['"]+/g, "");
    //decode token
    try {
        let payload = jwt.decode(token, secret);

        //check token expiration
        if (payload.exp <= moment().unix()) {
            return res.status(404).send({
                status: "error",
                message: "expired token",
            })
        }

        //add user data to the request
        req.user = payload;
    } catch (error) {
        return res.status(404).send({
            status: "error",
            message: "invalid token",
            error
        })
    }

    //execute action
    next();
}

export {authMiddleware}