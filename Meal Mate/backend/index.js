import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import AdminJS from 'adminjs';
import * as AdminJSMongoose from '@adminjs/mongoose';
import AdminJSExpress from '@adminjs/express';
import Order from './models/Order.js'; // Keep this import at the top
import dotenv from 'dotenv';
import Food from './models/Food.js';
import User from './models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


// Configure dotenv to access environment variables
dotenv.config();

// Ensure mongodbURL and PORT are loaded from the .env file
const { mongodbURL, JWT_SECRET, FRONTEND_URL, ADMIN_EMAIL, ADMIN_PASSWORD, COOKIE_SECRET } = process.env;
const PORT = process.env.PORT || 5000;


const app = express();

// Register AdminJS Mongoose adapter
AdminJS.registerAdapter(AdminJSMongoose);

// Create AdminJS instance
const adminJS = new AdminJS({
  databases: [mongoose],
  rootPath: '/admin',
  resources: [
    {
      resource: Food,
      options: {
        parent: { name: 'Food Management' },
      },
    },
    {
      resource: User, // Include User model for admin management
      options: {
        parent: { name: 'User Management' },
      },
    },
  ],
});

// Build and use AdminJS router
const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJS,
  {
    authenticate: async (email, password) => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        return { email };
      }
      return null;
    },
    cookieName: 'adminjs',
    cookiePassword: COOKIE_SECRET,
  },
  null,
  { resave: false, saveUninitialized: false, secret: COOKIE_SECRET }
);app.use(adminJS.options.rootPath, adminRouter);

// Middleware
app.use(cors({
origin: [FRONTEND_URL, 'http://localhost:5173'].filter(Boolean),  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());



// Food options route
app.get('/api/food-options', async (req, res) => {
  try {
    const foodItems = await Food.find();
    res.json(foodItems);
  } catch (err) {
    console.error('Error fetching food data:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Login route
// server/index.js
app.post('/api/login', async (req, res) => {
  try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user || !(await bcrypt.compare(password, user.password))) {
          return res.status(400).send({ message: 'Invalid email or password' });
      }

      const token = jwt.sign(
          { id: user._id, username: user.name, email: user.email }, // Include user._id in the token payload
          JWT_SECRET,
          { expiresIn: '1h' }
      );

      res.status(200).send({
          token,
          userId: user._id.toString(), // Send the MongoDB _id as a string
          username: user.name,
          email: user.email,
          address: user.address,
      });
  } catch (error) {
      console.log('Login error:', error);
      res.status(500).send({ message: 'Server error' });
  }
});

// Signup route
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password, address } = req.body;

    // Ensure all required fields are provided
    if (!name || !email || !password) {
      return res.status(400).send({ message: 'Please provide all required fields: name, email, password' });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: 'Email is already in use' });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = { name, email, password: hashedPassword, address: address || '' };

    const user = await User.create(newUser);

    // Remove password from the response
    const { password: _, ...userData } = user.toObject();

    return res.status(201).send(userData);
  } catch (error) {
    console.log('Signup error:', error);
    res.status(500).send({ message: error.message });
  }
});

app.post('/api/place-order', async (req, res) => {
  console.log('➡️ POST /api/place-order hit');
  console.log('➡️ Request body:', req.body);
  const { items, totalAmount, userId } = req.body;

  try {
      const newOrder = new Order({
          user: userId,
          items,
          totalAmount,
      });

      console.log('➡️ Creating new order:', newOrder);
      const savedOrder = await newOrder.save();
      console.log('✅ Order saved:', savedOrder);

      await User.findByIdAndUpdate(userId, {
          $push: { history: savedOrder._id },
      });
      console.log('✅ User history updated for userId:', userId);

      const successResponse = { success: true, message: 'Order placed successfully', order: savedOrder };
      console.log('➡️ Sending success response:', successResponse);
      res.status(200).json(successResponse);

  } catch (error) {
      console.error('🔥 Error placing order:', error);
      const errorResponse = { success: false, message: 'Failed to place order', error: error.message };
      console.log('➡️ Sending error response:', errorResponse);
      res.status(500).json(errorResponse);
  }
});
// Test route
app.get('/', (req, res) => {
  res.status(200).send("My name is spr");
});

// Connect to MongoDB and start the server
mongoose.connect(mongodbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ App connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log('❌ MongoDB connection error:', error.message);
  });