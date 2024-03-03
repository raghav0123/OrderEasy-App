import express from "express"
import cors from "cors"
import mongoose from "mongoose"

import dotenv from "dotenv"

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

dotenv.config({ path: './.env' })
const DB = process.env.DATABASE

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB successfully!');
        // Additional code to execute after successful connection
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})
const User = new mongoose.model('User', userSchema)


//Routes
app.get('/', (req, res) => {
    res.send('My Api')

})

// ...

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });
        if (user) {
            if (password === user.password) {
                res.send({ message: "Login Successfull", user: user })
            } else {
                res.send({ message: "Password didn't match" })
            }
            // Handle login logic here
        } else {
            console.log("User not registered:", email);
            res.send({ message: "invalid details", user: user });
        }
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).send({ message: "Internal server error" });
    }
});


app.post('/register', async (req, res) => { // Add 'async' keyword to the route handler
    const { name, email, password } = req.body;

    try {
        const foundUser = await User.findOne({ email: email }); // Use 'await' to resolve the Promise
        if (foundUser) {
            console.log("User already registered:", email);
            res.send({ message: "user already registered" });
        } else {
            const newUser = new User({ name, email, password });
            await newUser.save(); // Use 'await' to resolve the Promise
            console.log("User registered successfully:", email);
            res.send({ message: "successfully registered" });
        }
    } catch (err) {
        console.error("Error during registration:", err);
        res.status(500).send({ message: "Internal server error" });
    }
});


// ...


app.listen(9002, () => {
    console.log('db started at port 9002')
})