import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModels from "../models/userModels.js";
import JWT from "jsonwebtoken";

export const registerController = async(req,res) => {
    try{
        const {name,email,password,phone,address,question} = req.body;
        if(!name){
            return res.send({message:'Name is required'})
        }
        if(!email){
            return res.send({message:'Email is required'})
        }
        if(!password){
            return res.send({message:'Password is required'})
        }
        if(!phone){
            return res.send({message:'Phone Number is required'})
        }
        if(!address){
            return res.send({message:'Address is required'})
        }
        if(!question){
          return res.send({message:'Answer is required'})
      }

        const exisitingUser = await userModels.findOne({ email });

        if (exisitingUser) {
            return res.status(200).send({
              success: false,
              message: "Already registerd please login",
            });
        }
        const hashedPassword = await hashPassword(password);

        const user = await new userModels({
            name,
            email,
            phone,
            address,
            password: hashedPassword,
            question,
          }).save();
      
          res.status(201).send({
            success: true,
            message: "User Register Successfully",
            user,
          });


        

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message: "Error in Registeration",
            error
        })

    }
};


export const loginController = async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(404).send({
          success: false,
          message: "Invalid email or password",
        });
      }
      const user = await userModels.findOne({ email });
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Email is not registerd",
        });
      }
      const match = await comparePassword(password, user.password);
      if (!match) {
        return res.status(200).send({
          success: false,
          message: "Invalid Password",
        });
      }
      const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(200).send({
        success: true,
        message: "login successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in login",
        error,
      });
    }
  };


  export const forgotPasswordController = async (req, res) => {
    try {
      const { email, question, newPassword } = req.body;
      if (!email) {
        res.status(400).send({ message: "Email is required" });
      }
      if (!question) {
        res.status(400).send({ message: "Answer is required" });
      }
      if (!newPassword) {
        res.status(400).send({ message: "New Password is required" });
      }
      
      const user = await userModels.findOne({ email, question });
      
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Wrong Email Or Wrong Answer",
        });
      }
      const hashed = await hashPassword(newPassword);
      await userModels.findByIdAndUpdate(user._id, { password: hashed });
      res.status(200).send({
        success: true,
        message: "Password Reset Successful",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Something went wrong",
        error,
      });
    }
  };

  export const testController = (req, res) => {
    try {
      res.send("Protected Routes");
    } catch (error) {
      console.log(error);
      res.send({ error });
    }
  };


  export const updateProfileController = async (req, res) => {
    try {
      const { name, email, password, address, phone } = req.body;
      const user = await userModels.findById(req.user._id);
      
      if (password && password.length < 6) {
        return res.json({ error: "Passsword is required and 6 character long" });
      }
      const hashedPassword = password ? await hashPassword(password) : undefined;
      const updatedUser = await userModels.findByIdAndUpdate(
        req.user._id,
        {
          name: name || user.name,
          password: hashedPassword || user.password,
          phone: phone || user.phone,
          address: address || user.address,
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        message: "Profile Updated Successfully",
        updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(400).send({
        success: false,
        message: "Error while updating profile",
        error,
      });
    }
  };