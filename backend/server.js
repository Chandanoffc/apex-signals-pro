import express from "express";
import cors from "cors";
import axios from "axios";
import { scanMarket } from "./scanner.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Apex Signals Engine Running");
});

app.get("/signals", async (req, res) => {
  try {
    const signals = await scanMarket();
    res.json(signals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});