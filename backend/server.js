import express from "express";
import dotenv from "dotenv"
import cors from "cors"
import bcrypt from "bcryptjs"
import crypto from "crypto"
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import jwt from "jsonwebtoken"
import { sendOtp } from "./api/mail.js";
import { sendresult } from "./api/resultmail.js"
import { resetMail } from "./api/resetMail.js"
import dbConnect from "./api/dbConnect.js";
import { Register } from "./api/register_model.js"
dotenv.config({
  path: "./.env"
})

const app = express();

// app.options('*', cors()); // Handle preflight requests

// CORS middleware configuration
const corsOptions = {
  origin: 'https://gehuquiz-2oyc.vercel.app',  // Allow only your frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true  // Allow cookies or credentials if needed
};

// Apply CORS middleware to all routes
app.use(cors(corsOptions));

// app.use(cors({}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))




app.get('/', (req, res) => {
  res.json("Welcome to Server")
})

app.get('/register', (req, res) => {
  res.json("Welcome to Registration page")
})

//Route for Registration and to send otp       

app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpTimestamp = Date.now();
  const token = jwt.sign({ username, email, password, otp, otpTimestamp }, '321', { expiresIn: '5m' });

  if (email) {
    try {
      await sendOtp(email, otp)
      res.status(200).json({
        message: 'Otp Sent Successfully!!',
        token, // Send the token to the client
        redirect: '/otp' // Redirect to OTP page
      });
      console.log("Otp Sent Successfully!!");
      //console.log("Session data after registration:", req.session.userData);

    } catch (error) {
      console.error('Error sending OTP:', error);
      res.status(500).send('Error sending OTP');
    }
  } else {
    res.status(400).send('Email is required');
  }
});

//Route for verifying otp and saving user in database

app.post('/otp', async (req, res) => {

  const token = req.headers['authorization']?.split(' ')[1]; // Assuming 'Bearer <token>'
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const code = req.body.otp
    const currentTime = Date.now()
    const decoded = jwt.verify(token, '321');
    const { otp, otpTimestamp } = decoded;
    // Access the user data from the decoded token
    const { username, email, password } = decoded;


    if (code === otp && currentTime - otpTimestamp < 120000) {
      const registerUser = new Register({
        username,
        email,
        password
      })
      const Registered = await registerUser.save();
      return res.status(200).json({
        message: 'Registration successful!',
        redirect: '/login' // Redirect to quiz page
      });
    } else {
      return res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
})

//Route for login

app.post('/login', async (req, res) => {
  try {
    const Username = req.body.username
    const Password = req.body.password

    const userlogin = await Register.findOne({ username: Username })

    if (!userlogin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (userlogin.password === Password && userlogin.username === Username) {
      // Generate a JWT token
      const token = jwt.sign({ username: userlogin.username, password: userlogin.password }, '321', { expiresIn: '1h' });
      return res.status(200).json({ message: 'Login successful', token, redirect: '/' });

    }
    else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).send('User cannot be logged in, invalid credentials');
  }
})


//Route for sending final score in user mail

app.post('/score', async (req, res) => {

  const token = req.headers['authorization']?.split(' ')[1]; // Assuming 'Bearer <token>'
  if (!token) return res.status(401).send('Access denied. No token provided.');

  console.log('Received score:', req.body.score);  // Log the incoming score
  const score = req.body.score;
  try {
    // Save the score to your database

    // Decode the JWT token 
    const decoded = jwt.verify(token, '321');
    const username = decoded.username;

    if (!username) {
      return res.status(400).send('Invalid token: User ID not found');
    }

    // Fetch the user's email from the database using the userId
    const user = await Register.findOne({ username: username });

    if (!user) {
      return res.status(404).send('User not found');
    }

    const email = user.email;


    await sendresult(email, score);

    res.status(200).json({ message: 'Score saved successfully' });
  } catch (error) {
    console.error('Error saving score:', error);
    res.status(500).json({ message: 'Failed to save score' });
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await Register.find(); // Fetch all users from the database
    res.json(users); // Respond with the list of users
  } catch (error) {
    res.status(500).json({ message: 'Server error' }); // Handle any errors
  }
});

app.get('/reset-password', async (req, res) => {
  res.json("Welcome to Registration page")
})

// Determine the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, '../vite-project/dist')));

app.get('/reset-password/12345', (req, res) => {
  res.sendFile(path.join(__dirname, '../vite-project/dist', 'index.html'));

});

let resetToken

app.post('/reset-password', async (req, res) => {
  const { email } = req.body;

  try {
    // Check if user exists in the database
    const user = await Register.findOne({ email });

    if (!user) {
      console.log("error in server");
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a reset token
    resetToken = 12345
    // resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiration = Date.now() + 3600000; // Token is valid for 1 hour

    // Store the reset token and its expiration time in the user document
    user.resetToken = 12345;
    user.resetTokenExpiration = resetTokenExpiration;
    await user.save();

    // Send the reset email with the reset link
    const resetUrl = `https://gehuquiz-2oyc.vercel.app/reset-password/12345`;

    await resetMail(user, resetUrl);

    res.status(200).json({ message: 'Password reset email sent'});

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/reset-password/12345', (req, res) => {
  res.status(200).json({ message: 'Password reset email sent'});
});



// Password Reset Confirm - Step 2
app.post('/reset-password/12345', async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Find user by reset token and check if token is still valid
    const user = await Register.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() }, // Check if token is expired
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Hash the new password before saving
    //   const hashedPassword = await bcrypt.hash(newPassword, 12);
    const hashedPassword = newPassword;

    // Save the new password and clear the reset token fields
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiration = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});




dbConnect()//Function for the connection of database


export default app;// Export the app instance

// app.listen(process.env.PORT,()=>{
//     console.log(`App is listning on PORT : ${process.env.PORT}`)
// })