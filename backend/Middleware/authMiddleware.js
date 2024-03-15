import JWT from "jsonwebtoken";
import userModel from "../models/user.js";

//Protected Routes token base
export const requireSignIn = async (req, res, next) => {
    try {



        res.status(200).send({ ok: true });
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({ error: 'Unauthorized' });
    }
};

//admin acceess
export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: "UnAuthorized Access",
            });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: "Error in admin middelware",
        });
    }
};