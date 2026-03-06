const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
{
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
    index: true
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    index: true
  },

  role: {
    type: String,
    required: true,
    trim: true
  },

  status: {
    type: String,
    enum: ["Applied", "Interview", "Offer", "Rejected"],
    default: "Applied",
    index: true
  },

  appliedDate: {
    type: Date,
    default: Date.now
  },

  notes: {
    type: String,
    default: ""
  }

},
{
  timestamps: true
}
);


// compound index for faster dashboard queries
applicationSchema.index({ userId: 1, status: 1 });

module.exports = mongoose.model("Application", applicationSchema);