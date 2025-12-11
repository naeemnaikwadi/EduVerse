const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['student', 'instructor', 'admin'],
    required: true
  },
  avatarUrl: {
    type: String,
    default: 'https://ui-avatars.com/api/?name=User&background=6366f1&color=fff&size=100'
  },
  collegeName: {
    type: String,
    default: ''
  },
  // Additional fields for admin management
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  lastLogin: {
    type: Date
  },
  permissions: [{
    type: String
  }]
}, { timestamps: true });

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
