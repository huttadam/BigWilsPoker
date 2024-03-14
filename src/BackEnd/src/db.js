import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.set("strictQuery", true);

// Close connection to database
async function dbClose() {
  await mongoose.connection.close();
  console.log("Database connection closed");
}

// Connect to database using Mongoose

try {
 const m = await mongoose.connect(process.env.DB_URI);
  console.log(
    m.connection.readyState === 1
      ? "Database connection established"
      : "Database connection failed"
  );
} catch (error) {
  console.log(error);
}

// Export database connection and user model
export { dbClose };