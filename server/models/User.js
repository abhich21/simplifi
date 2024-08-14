import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name : {type: String, required:true, unique:false},
    email: {
        type: String,
        required: true,
        unique: true,
      },
      mobile: {
        type: String,
        required: true,
        unique: true
      }
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export default mongoose.model("User", UserSchema);