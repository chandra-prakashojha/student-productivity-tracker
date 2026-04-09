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
  },

  /* STATUS HISTORY (for timeline tracking) */

  history: [
    {
      status: {
        type: String,
        enum: ["Applied", "Interview", "Offer", "Rejected"]
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],

  /* INTERVIEW ROUNDS */

  interviewRounds: [
    {
      roundName: {
        type: String
      },
      date: {
        type: Date
      },
      status: {
        type: String,
        enum: ["Scheduled", "Cleared", "Rejected", "Pending"],
        default: "Pending"
      },
      notes: {
        type: String
      }
    }
  ]

},
{
  timestamps: true
}
);

/* COMPOUND INDEX */

applicationSchema.index({ userId: 1, status: 1 });

/* AUTO ADD FIRST HISTORY ENTRY */

applicationSchema.pre("save", function () {

  if (this.isNew) {
    this.history.push({
      status: this.status,
      date: new Date()
    });
  }

});

module.exports = mongoose.model("Application", applicationSchema);