import { createError } from "../error.js";
import User from "../models/User.js";


export const userRegister = async (req, res, next) => {
    try{
        const {name, email, mobile} = req.body;

        //Check for existing user
        const existingUser = await User.findOne({ $or: [{ email }, { mobile }] }).exec();
        if (existingUser) {
        return next(createError(409, "Email or mobile number is already in use."));
        }
        const user = new User({
            name,
            email,
            mobile
        });

        const createdUser = await user.save();

        return res.status(201).json({ message: `Welcome, ${name}`, user });

    } catch (err) {
    next(err);
  }
}