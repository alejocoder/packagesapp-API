import mongoose from "mongoose"


const DBconnection = async() => {

    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/packages");

        console.log("conexión exitosa a la base de datos")
    } catch (error) {
        console.log(error);
        throw new Error("no se pudo conectar a la base de datos")
    }
}

export {DBconnection};