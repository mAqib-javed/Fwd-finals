const mongoose = require('mongoose');
const Feedback = require('./models/Feedback');
require('dotenv').config();

// Sample feedback data
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
    message: 'Professor Martinez is an amazing instructor. Her teaching style is engaging and she makes complex topics easy to understand. She always encourages questions and provides detailed explanations. Highly recommend her classes!',
    rating: 5,
    category: 'instructor',
    isAnonymous: true,
    status: 'resolved'
  },
  {
    name: 'Carol Davis',
    message: 'I suggest adding more practical workshops and industry guest speakers. It would be great to have more networking opportunities with professionals in our field. Overall, the program is good but could benefit from more real-world connections.',
    rating: 4,
    category: 'suggestion',
    isAnonymous: false,
    status: 'pending'
  },
  {
    name: 'David Wilson',
    message: 'The online learning platform is user-friendly and the course materials are well-organized. I appreciate the flexibility of being able to access lectures anytime. The discussion forums are also very helpful for peer interaction.',
    rating: 5,
    category: 'general',
    isAnonymous: false,
    status: 'reviewed'
  },
  {
    name: 'Anonymous',
    message: 'The assessment methods are fair and comprehensive. I like how the assignments are designed to test both theoretical knowledge and practical application. The feedback from instructors is always constructive and helpful.',
    rating: 4,
    category: 'course',
    isAnonymous: true,
    status: 'resolved'
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    console.log('🔗 Connecting to MongoDB...');
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/student-feedback-tracker';
    console.log(`📍 Using MongoDB URI: ${mongoUri}`);
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Clear existing feedback (optional)
    console.log('🧹 Clearing existing feedback...');
    await Feedback.deleteMany({});
    console.log('✅ Existing feedback cleared');

    // Insert sample feedback
    console.log('📝 Inserting sample feedback...');
    const insertedFeedbacks = await Feedback.insertMany(sampleFeedbacks);
    console.log(`✅ Successfully inserted ${insertedFeedbacks.length} feedback entries`);

    // Display inserted feedback
    console.log('\n📊 Inserted Feedback:');
    insertedFeedbacks.forEach((feedback, index) => {
      console.log(`${index + 1}. ${feedback.name} - ${feedback.category} - ${feedback.rating}⭐`);
      console.log(`   "${feedback.message.substring(0, 80)}..."`);
      console.log(`   Status: ${feedback.status}\n`);
    });

    // Get statistics
    const stats = await Feedback.aggregate([
      {
        $group: {
          _id: null,
          totalFeedback: { $sum: 1 },
          averageRating: { $avg: '$rating' },
          categories: { $addToSet: '$category' },
          statuses: { $addToSet: '$status' }
        }
      }
    ]);

    if (stats.length > 0) {
      console.log('📈 Database Statistics:');
      console.log(`   Total Feedback: ${stats[0].totalFeedback}`);
      console.log(`   Average Rating: ${stats[0].averageRating.toFixed(1)}⭐`);
      console.log(`   Categories: ${stats[0].categories.join(', ')}`);
      console.log(`   Statuses: ${stats[0].statuses.join(', ')}`);
    }

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('🌐 You can now view the feedback in your frontend application');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  }
}

// Run the seeding function
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase, sampleFeedbacks };
