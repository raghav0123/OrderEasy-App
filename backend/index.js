import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import ConnectDB from "./config/db.js"
import dotenv from "dotenv"
import router from "./routes/authRoutes.js"
const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())



//DB Config
ConnectDB()

//routes
app.use("/api/v1/auth", router);

// const userSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     password: String
// })
// const User = new mongoose.model('User', userSchema)


//Routes
app.get('/', (req, res) => {
    res.send('My Api')

})

// ...

// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email: email });
//         if (user) {
//             if (password === user.password) {
//                 res.send({ message: "Login Successfull", user: user })
//             } else {
//                 res.send({ message: "Password didn't match" })
//             }
//             // Handle login logic here
//         } else {
//             console.log("User not registered:", email);
//             res.send({ message: "invalid details", user: user });
//         }
//     } catch (err) {
//         console.error("Error during login:", err);
//         res.status(500).send({ message: "Internal server error" });
//     }
// });




// ...


app.listen(9002, () => {
    console.log('db started at port 9002')
})