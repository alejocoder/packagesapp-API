import moment from "moment";
import user from "../models/user.js";
import bcrypt from "bcrypt"
import {createToken} from "../services/jwt.js"

const loginUser = (req,res) => {

    //gather params
    let params = req.body;

    if (!params.email || !params.password) {
        return res.status(400).send({
            status: "error",
            message: "faltan datos por enviar"
        });
    }
    //search for the user in the database
    user.findOne({email: params.email}).exec((error, user) => {
            if (error || !user) {
                return res.status(404).send({
                    status: "error",
                    message: "no existe el usuario"
                })
            };

            //check password
            const pwd = bcrypt.compareSync(params.password, user.password);

            if (!pwd) {
                return res.status(400).send({
                    status: "error",
                    message: "la contraseña es incorrecta"
                })
            };
            //return token
            const token = createToken(user);
            //return user data
            return res.status(200).json({
                status: "succes",
                message: 'succesful login',
                user: {
                    id: user._id,
                    email: user.email,
                },
                token
    })

    })
    
};

const RegisterUser = (req,res) => {

    //gather the request data
    let params = req.body;

    //apply validations of data integrity
    if (!params.email || !params.password) {
        return res.status(400).json({
            status:"error",
            message:"faltan datos"
        })
    }

    //check user duplication
    user.find({$or: [
        {email: params.email.toLowerCase()},
    ]
    }).exec(async (error, Users) => {

        if (error) {return res.status(500).json({ status: "error", message: "hubo un error en la consulta"})}

        if (Users && Users.length >=1) {
            return res.status(200).send({
                status: "success",
                message: "El usuario ya existe"
            });
        }
        //hash the password
        let pwd = await bcrypt.hash(params.password, 10,);
        params.password = pwd
        //create user
        let user_to_save = new user(params)

        //save new user in mongo
        user_to_save.save((error, userStored) => {
            if (error || !userStored) {
                return res
                    .status(500)
                    .send({
                        status:"error",
                        message: "error al guardar el usuario en base de datos"
                    })
            }

            if (userStored) {
                //return a response
                return res.status(200)
                    .json({   
                        status:"succes",
                        message: 'user registered succesfully',
                        user: userStored
                })
            }
        })
        

    })
    
}

export {loginUser, RegisterUser}