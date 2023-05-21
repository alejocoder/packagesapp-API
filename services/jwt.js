import jwt from "jwt-simple";
import moment from "moment/moment.js";

//secret key
const secret = "clave-super-secreta";

const createToken = (user) => {
    const payload={
        id: user._id,
        email: user.email,
        iat: moment().unix(),
        exp: moment().add(30, "days").unix(),
    }

    //return jwt token
    return jwt.encode(payload, secret)
}

export {createToken, secret}