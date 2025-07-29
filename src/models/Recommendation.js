import mongoose from "mongoose";



const recommendationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  contentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Content',
    required: true
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  reasons: [{
    type: String,
    trim: true
  }],
  algorithm: {
    type: String,
    enum: ['sentiment_match', 'topic_match', 'collaborative', 'hybrid'],
    required: true
  },
  metadata: {
    userSentiment: {
      type: String,
      enum: ['positive', 'negative', 'neutral']
    },
    userTopics: [{
      type: String,
      trim: true
    }],
    contentSentiment: {
      type: String,
      enum: ['positive', 'negative', 'neutral']
    },
    contentTopics: [{
      type: String,
      trim: true
    }],
    similarityScore: {
      type: Number,
      min: 0,
      max: 1
    }
  },
  isViewed: {
    type: Boolean,
    default: false
  },
  isClicked: {
    type: Boolean,
    default: false
  },
  isLiked: {
    type: Boolean,
    default: false
  },
  expiresAt: {
    type: Date,
    default: function() {
      return new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    }
  }
}, {
  timestamps: true
});

// Indexes for better query performance
recommendationSchema.index({ userId: 1, score: -1 });
recommendationSchema.index({ userId: 1, createdAt: -1 });
recommendationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Method to mark recommendation as viewed
recommendationSchema.methods.markAsViewed = function() {
  this.isViewed = true;
  return this.save();
};

// Method to mark recommendation as clicked
recommendationSchema.methods.markAsClicked = function() {
  this.isClicked = true;
  return this.save();
};

// Method to mark recommendation as liked
recommendationSchema.methods.markAsLiked = function() {
  this.isLiked = true;
  return this.save();
};

// Static method to get active recommendations for a user
recommendationSchema.statics.getActiveRecommendations = function(userId, limit = 10) {
  return this.find({
    userId,
    expiresAt: { $gt: new Date() }
  })
  .populate('contentId')
  .sort({ score: -1, createdAt: -1 })
  .limit(limit);
};

// Static method to get recommendation statistics
recommendationSchema.statics.getStats = function(userId) {
  return this.aggregate([
    { $match: { userId: mongoose.Types.ObjectId(userId) } },
    {
      $group: {
        _id: null,
        totalRecommendations: { $sum: 1 },
        viewedRecommendations: { $sum: { $cond: ['$isViewed', 1, 0] } },
        clickedRecommendations: { $sum: { $cond: ['$isClicked', 1, 0] } },
        likedRecommendations: { $sum: { $cond: ['$isLiked', 1, 0] } },
        averageScore: { $avg: '$score' }
      }
    }
  ]);
};

const Recommendation = mongoose.model('Recommendation', recommendationSchema); 
export default Recommendation