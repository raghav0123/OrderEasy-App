import userModel from "../models/user.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";


const comparePassword = async (password, hashedPassword) => {
    return password === hashedPassword;
};
// register controller
const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer, role } = req.body;
        //validations
        if (!name) {
            return res.send({ error: "Name is Required" });
        }
        if (!email) {
            return res.send({ message: "Email is Required" });
        }
        if (!password) {
            return res.send({ message: "Password is Required" });
        }
        if (!phone) {
            return res.send({ message: "Phone no is Required" });
        }
        if (!address) {
            return res.send({ message: "Address is Required" });
        }
        if (!answer) {
            return res.send({ message: "Answer is Required" });
        }
        //check user
        const exisitingUser = await userModel.findOne({ email });
        //exisiting user
        if (exisitingUser) {
            return res.status(200).send({
                success: false,
                message: "Already Register please login",
            });
        }
        //register user
        //   const hashedPassword = await hashPassword(password);
        //save
        const user = await new userModel({
            name,
            email,
            phone,
            address,
            password,
            answer,
            role
        }).save();
        if (role != 1) {
            res.status(201).send({
                success: true,
                message: "User Register Successfully",
                user,
            });
        }
        else {
            res.status(201).send({
                success: true,
                message: "Admin Register Successfully",
                user,
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Registeration",
            error,
        });
    }
};
//Forget Password
const forgetPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;
        if (!email || !newPassword || !answer) {
            return res.status(400).send({
                success: false,
                message: "Invalid input data",
            });
        }

        const user = await userModel.findOne({ email });
        if (!user || user.answer !== answer) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered or answer is incorrect",
            });
        }

        // Check if password is already set
        const match = await comparePassword(newPassword, user.password);
        if (match) {
            return res.status(400).send({
                success: false,
                message: "Password is already set",
            });
        }

        // Update user's password
        await userModel.findByIdAndUpdate(user._id, { password: newPassword });
        res.status(200).send({
            success: true,
            message: "Password reset successfully",
        });
    } catch (error) {
        console.error("Error in forgetPasswordController:", error);
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};


//POST LOGIN
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {

            return res.status(404).send({
                success: false,
                message: "Invalid email or password",
            });
        }
        //check user
        const user = await userModel.findOne({ email });
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
        //token
        const token = await JWT.sign({ _id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        //   const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
        //     expiresIn: "7d",
        //   });
        res.status(200).send({
            success: true,
            message: "login successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
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


export default { registerController, loginController, forgetPasswordController }