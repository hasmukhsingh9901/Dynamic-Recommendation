import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    preferences: {
      topics: [
        {
          type: String,
          trim: true,
        },
      ],
      sentiment: {
        positive: { type: Number, default: 0 },
        negative: { type: Number, default: 0 },
        neutral: { type: Number, default: 0 },
      },
      categories: [
        {
          type: String,
          trim: true,
        },
      ],
    },
    interactions: [
      {
        contentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Content',
          required: true,
        },
        action: {
          type: String,
          enum: ['click', 'like', 'comment', 'share'],
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
        sentiment: {
          type: String,
          enum: ['positive', 'negative', 'neutral'],
          default: 'neutral',
        },
        topics: [
          {
            type: String,
            trim: true,
          },
        ],
      },
    ],
    lastActive: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Index for better query performance
userSchema.index({ username: 1 });
userSchema.index({ email: 1 });
userSchema.index({ 'interactions.timestamp': -1 });

// Method to add interaction
userSchema.methods.addInteraction = function (
  contentId,
  action,
  sentiment = 'neutral',
  topics = []
) {
  this.interactions.push({
    contentId,
    action,
    sentiment,
    topics,
  });

  // Update last active
  this.lastActive = new Date();

  // Update preferences based on interaction
  if (sentiment === 'positive') {
    this.preferences.sentiment.positive += 1;
  } else if (sentiment === 'negative') {
    this.preferences.sentiment.negative += 1;
  } else {
    this.preferences.sentiment.neutral += 1;
  }

  // Add new topics to preferences
  topics.forEach(topic => {
    if (!this.preferences.topics.includes(topic)) {
      this.preferences.topics.push(topic);
    }
  });

  return this.save();
};

// Method to get recent interactions
userSchema.methods.getRecentInteractions = function (limit = 10) {
  return this.interactions
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, limit);
};

// Method to get user preferences summary
userSchema.methods.getPreferencesSummary = function () {
  const totalInteractions = this.interactions.length;
  const dominantSentiment = Object.entries(this.preferences.sentiment).sort(
    ([, a], [, b]) => b - a
  )[0][0];

  return {
    totalInteractions,
    dominantSentiment,
    favoriteTopics: this.preferences.topics.slice(0, 5),
    sentimentBreakdown: this.preferences.sentiment,
  };
};

const User = mongoose.model('User', userSchema);
export default User;
