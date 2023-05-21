import mongoose, { Schema } from "mongoose";


const UserSchema = Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
      },
    packages:[{
        type: Schema.ObjectId,
        ref: "Packages"
    }]
})

export default mongoose.model('Users', UserSchema)