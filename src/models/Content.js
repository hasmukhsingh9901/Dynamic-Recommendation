import mongoose from "mongoose";


const contentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  type: {
    type: String,
    enum: ['article', 'video', 'image', 'podcast', 'social'],
    required: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  url: {
    type: String,
    required: true,
    trim: true
  },
  thumbnail: {
    type: String,
    trim: true
  },
  // AI Analysis Results
  aiAnalysis: {
    sentiment: {
      type: String,
      enum: ['positive', 'negative', 'neutral'],
      default: 'neutral'
    },
    confidence: {
      type: Number,
      min: 0,
      max: 1,
      default: 0.5
    },
    topics: [{
      type: String,
      trim: true
    }],
    keywords: [{
      type: String,
      trim: true
    }],
    summary: {
      type: String,
      trim: true,
      maxlength: 500
    },
    analyzedAt: {
      type: Date,
      default: Date.now
    }
  },
  // Engagement metrics
  engagement: {
    clicks: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    comments: { type: Number, default: 0 },
    shares: { type: Number, default: 0 },
    totalInteractions: { type: Number, default: 0 }
  },
  // Recommendation score
  recommendationScore: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  // Content metadata
  author: {
    type: String,
    trim: true
  },
  publishDate: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Indexes for better query performance
contentSchema.index({ category: 1 });
contentSchema.index({ 'aiAnalysis.sentiment': 1 });
contentSchema.index({ 'aiAnalysis.topics': 1 });
contentSchema.index({ recommendationScore: -1 });
contentSchema.index({ 'engagement.totalInteractions': -1 });
contentSchema.index({ publishDate: -1 });

// Method to update engagement metrics
contentSchema.methods.updateEngagement = function(action) {
  this.engagement[action] += 1;
  this.engagement.totalInteractions += 1;
  
  // Update recommendation score based on engagement
  this.recommendationScore = Math.min(100, 
    (this.engagement.totalInteractions * 10) + 
    (this.engagement.likes * 5) + 
    (this.engagement.shares * 3)
  );
  
  return this.save();
};

// Method to update AI analysis
contentSchema.methods.updateAIAnalysis = function(analysis) {
  this.aiAnalysis = {
    ...this.aiAnalysis,
    ...analysis,
    analyzedAt: new Date()
  };
  return this.save();
};

// Method to get content summary
contentSchema.methods.getSummary = function() {
  return {
    id: this._id,
    title: this.title,
    description: this.description,
    type: this.type,
    category: this.category,
    sentiment: this.aiAnalysis.sentiment,
    topics: this.aiAnalysis.topics,
    engagement: this.engagement,
    recommendationScore: this.recommendationScore,
    url: this.url,
    thumbnail: this.thumbnail
  };
};

// Static method to find content by criteria
contentSchema.statics.findByCriteria = function(criteria) {
  const query = { isActive: true };
  
  if (criteria.category) {
    query.category = criteria.category;
  }
  
  if (criteria.sentiment) {
    query['aiAnalysis.sentiment'] = criteria.sentiment;
  }
  
  if (criteria.topics && criteria.topics.length > 0) {
    query['aiAnalysis.topics'] = { $in: criteria.topics };
  }
  
  if (criteria.minScore) {
    query.recommendationScore = { $gte: criteria.minScore };
  }
  
  return this.find(query)
    .sort({ recommendationScore: -1, 'engagement.totalInteractions': -1 })
    .limit(criteria.limit || 10);
};

const Content = mongoose.model('Content', contentSchema); 
export default Content