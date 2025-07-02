const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

// Middleware
app.use(helmet()); // Security headers
app.use(limiter); // Apply rate limiting
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-production-domain.com'] 
    : ['http://localhost:3000', 'http://localhost:5173'], // Vite default port
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// MongoDB connection
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/student-feedback-tracker';
mongoose.connect(mongoUri)
.then(() => {
  console.log('✅ Connected to MongoDB');
  // Seed database with sample data if empty
  seedDatabaseIfEmpty();
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error.message);
  console.log('💡 Please ensure MongoDB is running or update MONGODB_URI in .env file');
  console.log('📖 See README.md for MongoDB setup instructions');
  console.log('🔄 Server will continue running but database operations will fail');
});

// Function to seed database with sample data
async function seedDatabaseIfEmpty() {
  try {
    const Feedback = require('./models/Feedback');
    const count = await Feedback.countDocuments();

    if (count === 0) {
      console.log('📝 Database is empty, adding sample feedback...');

      const sampleFeedbacks = [
        {
          name: 'Alice Johnson',
          message: 'The course content is excellent and very well structured. The instructors are knowledgeable and always ready to help. I particularly enjoyed the hands-on projects that helped me apply what I learned in real-world scenarios.',
          rating: 5,
          category: 'course',
          isAnonymous: false,
          status: 'reviewed'
        },
        {
          name: 'Bob Smith',
          message: 'Great learning environment! The facilities are modern and well-maintained. The library has all the resources I need for my studies. However, I think the cafeteria could use some improvement in terms of food variety.',
          rating: 4,
          category: 'facility',
          isAnonymous: false,
          status: 'pending'
        },
        {
          name: 'Anonymous',
          message: 'Professor Martinez is an amazing instructor. Her teaching style is engaging and she makes complex topics easy to understand. She always encourages questions and provides detailed explanations.',
          rating: 5,
          category: 'instructor',
          isAnonymous: true,
          status: 'resolved'
        }
      ];

      await Feedback.insertMany(sampleFeedbacks);
      console.log(`✅ Added ${sampleFeedbacks.length} sample feedback entries`);
    } else {
      console.log(`📊 Database already contains ${count} feedback entries`);
    }
  } catch (error) {
    console.log('⚠️ Could not seed database:', error.message);
  }
}

// Routes
app.use('/api/feedback', require('./routes/feedback'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Student Feedback Tracker API is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('❌ Server Error:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔗 API Health Check: http://localhost:${PORT}/api/health`);
});

module.exports = app;
