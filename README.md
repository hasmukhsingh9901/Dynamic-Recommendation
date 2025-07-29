# Dynamic Recommendations - AI-Powered Content Discovery

A real-time recommendation system powered by Gemini AI that analyzes user interactions and provides personalized content recommendations using advanced machine learning algorithms.

## 🚀 Features

### Core Features
- **Real-time User Interaction Tracking**: Track clicks, likes, comments, and shares
- **AI-Powered Content Analysis**: Gemini AI analyzes content sentiment and extracts topics
- **Multi-Algorithm Recommendations**: 
  - Sentiment-based matching
  - Topic-based filtering
  - Collaborative filtering
  - AI-powered hybrid recommendations
- **Modern Web Interface**: Beautiful, responsive UI with real-time analytics

### Technical Features
- **Clean MVC Architecture**: Modular, maintainable code structure
- **MongoDB Integration**: Scalable data storage with optimized queries
- **RESTful API**: Comprehensive API endpoints for all operations
- **Security**: Rate limiting, input validation, and error handling
- **Performance**: Optimized database queries and caching

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **Google Gemini AI** - Content analysis and recommendations
- **Joi** - Input validation
- **Helmet** - Security middleware

### Frontend
- **Vanilla JavaScript** - No framework dependencies
- **Font Awesome** - Icons
- **CSS3** - Modern styling with animations
- **Responsive Design** - Mobile-friendly interface

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v14 or higher)
- **MongoDB** (v4.4 or higher)
- **Google Gemini API Key** (Get from [Google AI Studio](https://makersuite.google.com/app/apikey))

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd dynamic-recommendations
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Copy the environment template and configure your settings:

```bash
cp env.example .env
```

Edit `.env` file with your configuration:
```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/dynamic-recommendations

# Gemini AI Configuration
GEMINI_API_KEY=your_gemini_api_key_here

# Server Configuration
PORT=3000
NODE_ENV=development

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 4. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Ubuntu/Debian
sudo systemctl start mongod

# On Windows
net start MongoDB
```

### 5. Run the Application

#### Development Mode
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

### 6. Access the Application
- **Frontend**: http://localhost:3000
- **Health Check**: http://localhost:3000/health
- **API Documentation**: Available at `/api` endpoints

## 📊 API Endpoints

### Users
- `POST /api/users` - Create a new user
- `GET /api/users` - Get all users (admin)
- `GET /api/users/:userId` - Get user by ID
- `PUT /api/users/:userId` - Update user
- `DELETE /api/users/:userId` - Delete user
- `GET /api/users/:userId/interactions` - Get user interactions
- `POST /api/users/:userId/interactions` - Record user interaction
- `GET /api/users/:userId/preferences` - Get user preferences

### Content
- `POST /api/content` - Create new content
- `GET /api/content` - Get all content with filtering
- `GET /api/content/criteria` - Get content by criteria
- `GET /api/content/stats` - Get content statistics
- `POST /api/content/bulk-analyze` - Bulk analyze content
- `GET /api/content/:contentId` - Get content by ID
- `PUT /api/content/:contentId` - Update content
- `DELETE /api/content/:contentId` - Delete content
- `PATCH /api/content/:contentId/engagement` - Update engagement
- `POST /api/content/:contentId/analyze` - Analyze content with AI

### Recommendations
- `POST /api/recommendations/:userId/generate` - Generate recommendations
- `GET /api/recommendations/:userId/active` - Get active recommendations
- `GET /api/recommendations/:userId/stats` - Get recommendation statistics
- `GET /api/recommendations/:userId/history` - Get recommendation history
- `GET /api/recommendations/:userId/analytics` - Get recommendation analytics
- `GET /api/recommendations/:userId/similar-users` - Get similar users
- `GET /api/recommendations/:userId/performance` - Get performance metrics
- `DELETE /api/recommendations/:userId/expired` - Clear expired recommendations
- `PATCH /api/recommendations/:recommendationId/status` - Update recommendation status

## 🎯 Usage Guide

### 1. Getting Started
1. Start the application
2. Open http://localhost:3000 in your browser
3. Enter a user ID (e.g., "user1") and click "Connect"
4. The system will load user profile and generate initial recommendations

### 2. User Interactions
- **View Content**: Click "View" on any content item
- **Like Content**: Click "Like" to record positive interaction
- **Share Content**: Click "Share" to record sharing behavior
- **Filter Content**: Use the dropdown to filter by content type

### 3. Real-time Features
- **Live Updates**: Watch the real-time panel for live updates
- **Instant Recommendations**: New recommendations appear automatically
- **Analytics Dashboard**: Real-time performance metrics

### 4. Testing the System

#### Create Sample Users
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser1", "email": "test1@example.com"}'
```

#### Create Sample Content
```bash
curl -X POST http://localhost:3000/api/content \
  -H "Content-Type: application/json" \
  -d '{
    "title": "AI in Modern Technology",
    "description": "Exploring the impact of artificial intelligence on modern technology and society.",
    "type": "article",
    "category": "Technology",
    "url": "https://example.com/ai-article",
    "author": "Tech Writer"
  }'
```

#### Record User Interaction
```bash
curl -X POST http://localhost:3000/api/users/user1/interactions \
  -H "Content-Type: application/json" \
  -d '{
    "contentId": "content_id_here",
    "action": "like",
    "sentiment": "positive",
    "topics": ["AI", "Technology"]
  }'
```

#### Generate Recommendations
```bash
curl -X POST http://localhost:3000/api/recommendations/user1/generate
```

## 🏗️ Architecture

### MVC Structure
```
├── models/           # Data models (User, Content, Recommendation)
├── controllers/      # Business logic (UserController, ContentController, etc.)
├── routes/          # API route definitions
├── services/        # Core services (GeminiService, RecommendationService, etc.)
├── config/          # Configuration files
├── public/          # Frontend files
└── server.js        # Main application entry point
```

### Data Flow
1. **Content Analysis** → Gemini AI → Sentiment/Topic Extraction
2. **Recommendation Engine** → Multiple Algorithms → Personalized Results

### Database Schema
- **Users**: Profile, preferences, interaction history
- **Content**: Metadata, AI analysis, engagement metrics
- **Recommendations**: User-content mappings, scores, algorithms

## 🔧 Configuration

### Environment Variables
- `MONGODB_URI`: MongoDB connection string
- `GEMINI_API_KEY`: Google Gemini API key
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Environment mode
- `RATE_LIMIT_WINDOW_MS`: Rate limiting window
- `RATE_LIMIT_MAX_REQUESTS`: Maximum requests per window

### MongoDB Setup
```bash
# Create database
use dynamic-recommendations

# Create indexes for performance
db.users.createIndex({ "username": 1 })
db.users.createIndex({ "email": 1 })
db.content.createIndex({ "category": 1 })
db.content.createIndex({ "aiAnalysis.sentiment": 1 })
db.recommendations.createIndex({ "userId": 1, "score": -1 })
```

## 🧪 Testing

### Run Tests
```bash
npm test
```

### Manual Testing
1. **User Management**: Create, update, delete users
2. **Content Management**: Add, analyze, filter content
3. **Recommendations**: Generate and test different algorithms

### Performance Testing
```bash
# Load testing with Apache Bench
ab -n 1000 -c 10 http://localhost:3000/health
```

## 📈 Monitoring & Analytics

### Built-in Analytics
- User interaction patterns
- Recommendation performance metrics
- Content engagement statistics
- Real-time system health

### Logging
- Application logs in console
- Error tracking and reporting
- Performance monitoring

## 🔒 Security Features

- **Input Validation**: Joi schema validation
- **Rate Limiting**: Prevent abuse
- **CORS Protection**: Cross-origin request handling
- **Helmet Security**: Security headers
- **Error Handling**: Graceful error management

## 🚀 Deployment

### Production Setup
1. Set `NODE_ENV=production`
2. Configure MongoDB for production
3. Set up proper logging
4. Configure reverse proxy (nginx)
5. Set up SSL certificates

### Docker Deployment
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the API endpoints

## 🔮 Future Enhancements

- [ ] Machine learning model training
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Mobile app development
- [ ] A/B testing framework
- [ ] Advanced caching strategies
- [ ] Microservices architecture
- [ ] Kubernetes deployment

---

**Built with ❤️ using Node.js, MongoDB, and Gemini AI** 
