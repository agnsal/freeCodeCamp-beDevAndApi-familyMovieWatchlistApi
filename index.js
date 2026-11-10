import express from "express";
import helmet from "helmet";

import watchlistRoutes from "./routes/watchlist.js";
import authRoutes from "./routes/auth.js";
import { authenticate } from "./middleware/authenticate.js";

const PORT = process.env.PORT;
const app = express();

app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Family Movie Watchlist API");
});

app.use("/api/auth", authRoutes);
app.use("/api/watchlist", authenticate, watchlistRoutes);

app.use((req, res, next) => {
  res.status(404).json({message: "Resource not found."});
});
app.use((err, req, res, next) => {
  console.error("Error: ", err);
  res.status(500).json({message: "Something went wrong."});
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
