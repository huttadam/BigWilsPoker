import express from "express";
import playerRoute from "./routes/player_routes.js";
import gameRoute from "./routes/game_routes.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
// Configuration
dotenv.config();
mongoose.set("strictQuery", true);

app.use(cors());
app.use(express.json());


app.use("/players", playerRoute);
app.use("/games", gameRoute);


// Default route
app.get("/", (request, response) =>
  response.status(200).send({ info: "Hello There" })
);

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


app.listen(8888, () =>
  console.log(`App running on port @ http://localhost:8888`)
);

export default app;