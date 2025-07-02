# Student Feedback Tracker

A modern MERN stack application for collecting and managing student feedback with a responsive user interface.

## 🚀 Features

- **Submit Feedback**: Students can submit feedback with name, message, rating, and category
- **Anonymous Submissions**: Option to submit feedback anonymously
- **View Feedback**: Browse all submitted feedback with filtering and pagination
- **Statistics Dashboard**: View comprehensive statistics and analytics
- **Responsive Design**: Mobile-first design that works on all devices
- **Real-time Updates**: Automatic refresh of feedback list after submission
- **Form Validation**: Client and server-side validation for data integrity

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite for fast development
- **Modern CSS** with CSS Grid and Flexbox
- **Lucide React** for beautiful icons
- **React Toastify** for notifications
- **Axios** for API communication

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **CORS** for cross-origin requests
- **Helmet** for security headers
- **Rate limiting** for API protection
- **Environment variables** for configuration

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd student-feedback-tracker
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Install server dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Install client dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

## ⚙️ Configuration

### Server Configuration

1. **Create environment file**
   ```bash
   cd server
   cp .env.example .env
   ```

2. **Update server/.env with your configuration**
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/student-feedback-tracker
   NODE_ENV=development
   ```

   **For MongoDB Atlas:**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/student-feedback-tracker
   ```

### Client Configuration

1. **Create environment file**
   ```bash
   cd client
   cp .env.example .env
   ```

2. **Update client/.env**
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

## 🚀 Running the Application

### Option 1: Run Both Servers Simultaneously
```bash
npm run dev
```

### Option 2: Run Servers Separately

**Terminal 1 - Backend Server:**
```bash
npm run server
```

**Terminal 2 - Frontend Server:**
```bash
npm run client
```

## 📱 Usage

1. **Access the application** at `http://localhost:5173`

2. **Submit Feedback:**
   - Fill out the feedback form with your name and message
   - Select a category and rating
   - Choose to submit anonymously if desired
   - Click "Submit Feedback"

3. **View Feedback:**
   - Navigate to the "View Feedback" tab
   - Use filters to find specific feedback
   - Browse through paginated results

4. **View Statistics:**
   - Check the "Statistics" tab for insights
   - See total feedback count, average rating
   - View category and status breakdowns

## 🔧 MongoDB Setup

### Local MongoDB Installation

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

**macOS (using Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community
```

**Windows:**
Download and install from [MongoDB Official Website](https://www.mongodb.com/try/download/community)

### MongoDB Atlas (Cloud)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get connection string
4. Update `MONGODB_URI` in server/.env

## 🧪 API Endpoints

### Feedback Routes
- `GET /api/feedback` - Get all feedback (with pagination and filters)
- `POST /api/feedback` - Create new feedback
- `GET /api/feedback/:id` - Get specific feedback
- `DELETE /api/feedback/:id` - Delete feedback
- `GET /api/feedback/stats` - Get feedback statistics

### Health Check
- `GET /api/health` - API health status

## 📊 Database Schema

### Feedback Model
```javascript
{
  name: String (required, 2-100 chars),
  message: String (required, 10-1000 chars),
  rating: Number (1-5, default: 5),
  category: String (enum: general, course, instructor, facility, suggestion),
  isAnonymous: Boolean (default: false),
  status: String (enum: pending, reviewed, resolved),
  createdAt: Date,
  updatedAt: Date
}
```

## 🎨 Responsive Design

The application is built with a mobile-first approach:

- **Mobile**: < 480px
- **Tablet**: 480px - 768px  
- **Desktop**: > 768px

Features responsive:
- Navigation tabs stack on mobile
- Grid layouts adapt to screen size
- Touch-friendly buttons and forms
- Optimized typography scaling

## 🔒 Security Features

- **Helmet.js** for security headers
- **Rate limiting** to prevent abuse
- **Input validation** on client and server
- **CORS** configuration
- **Environment variables** for sensitive data

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy dist/ folder
```

### Backend (Heroku/Railway)
```bash
cd server
# Set environment variables
# Deploy server folder
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running locally
   - Check connection string in .env
   - Verify network connectivity for Atlas

2. **Port Already in Use**
   - Change PORT in server/.env
   - Kill existing processes: `lsof -ti:5000 | xargs kill -9`

3. **CORS Errors**
   - Verify client URL in server CORS configuration
   - Check API_URL in client/.env

4. **Build Errors**
   - Clear node_modules: `rm -rf node_modules package-lock.json`
   - Reinstall dependencies: `npm install`

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ using the MERN Stack**
