import { sendWelcomeEmail } from "../helpers/email.js";
import validator from "email-validator";
import User from "../models/user.js";
import { hashPassword, comparePassword } from "../helpers/auth.js";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";



export const login = async (req, res) => {
 let { email, password } = req.body;
 if (!validator.validate(email)) {
 return res.json({ error: "A valid email is required" });
 }if (!email?.trim()) {
    return res.json({ error: "Email is required" });
    }
    if (!password?.trim()) {
    return res.json({ error: "Password is required" });
    }
    if (password?.trim() && password?.length < 6) {
    return res.json({
    error: "Password should be at least 6 characters long",
    });
    }
    try {
    const user = await User.findOne({ email });
    // if user is new or does not exist
    if (!user) {
    try {
    await sendWelcomeEmail(email);
    const createdUser = await User.create({
    email,
    password: await hashPassword(password),
    username: nanoid(6),
    });
    const token = jwt.sign(
    { _id: createdUser._id },
    process.env.JWT_SECRET,
    {
    expiresIn: "7d",
    }
    );
    createdUser.password = undefined;
    return res.json({
    user: createdUser,
    token,
    });
    } catch (err) {
    return res.json({
    error: "Invalid email. Please use your valid email.",
    });
    }
    } else {
    const match = await comparePassword(password, user.password);
    if (!match) {
    return res.json({
    error: "Wrong password",
    });
    } else {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET,
   {
    expiresIn: "1w",});
    user.password = undefined;
    return res.json({
    user,
    token,
    });
    }
    }
    } catch (err) {
    console.log(err);
    res.json({ error: "Something went wrong. Try again!" });
    }
   };
   