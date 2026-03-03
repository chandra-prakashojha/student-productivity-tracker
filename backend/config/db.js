const { MongoClient } = require("mongodb");

let db;

async function connectDB() {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error("MONGO_URI is not defined in .env file");
    }

    const client = new MongoClient(uri);

    await client.connect();
    console.log("✅ MongoDB Connected Successfully");

    db = client.db(process.env.DB_NAME);

  } catch (error) {
    console.error("❌ Database connection error:", error.message);
    process.exit(1);
  }
}

function getDB() {
  return db;
}

function getStudentsCollection() {
  return db.collection("students");
}

module.exports = {
  connectDB,
  getDB,
  getStudentsCollection
};