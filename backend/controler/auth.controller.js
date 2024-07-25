import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';




export const signup =async (req, res) => {
  //  field from request object distructuring
  const { username, email, password, confirmPassword, gender } = req.body;

  // find email
  let validUser;
  validUser = await User.findOne({ email });

  // Check if the user exists or not
  if (validUser) {
    return res.status(400).json({
      success: false,
      message: "User already exist",
    });
  }

  // Check if the password and confirm password matched or not
  if (password !== confirmPassword) {
    return res.status(400).json({
      error: "Password deos not match",
    });
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);

  // Profile avatar for user profile , boy and girl
  const boyPofilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
  const girlPofilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

  // create user
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    gender,
    profilePic: gender === "male" ? boyPofilePic : girlPofilePic,
  });

    // logic here
    try {

        // generate jwt token
        const token = jwt.sign({ id: newUser._id }, process.env.jwt_SECRET)
        
        await newUser.save()

        res.cookie('access_token',token,{httpOnly:true}).status(201).json({
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            profilePic:newUser.profilePic
        })
    } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
};



 

export const login = (req, res) => {};





export const logout = (req, res) => {};