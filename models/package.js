import mongoose, { Schema } from 'mongoose';

const packageSchema = new Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  state:{
    type: String,
    required: true,
    enum: ["pending", "processing", "sent", "recieved"]
  },
  createdBy:{
    type: Schema.ObjectId,
    ref : "Users"
  },
  initialLatitude: {
    type: Number,
    required: true,
    trim: true
  },
  initialLongitude: {
    type: Number,
    required: true,
    trim: true
  },
  finalLatitude: {
    type: Number,
    required: true,
    trim: true
  },
  finalLongitude: {
    type: Number,
    required: true,
    trim: true
  },
});

export default mongoose.model('Packages', packageSchema);