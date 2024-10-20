import express from "express";
import cors from "cors";
import { restartServer } from "./restart_server.js";
import dotenv from "dotenv";
import { mailRouter } from "./routes/mailRoute.js";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());

app.get("/api/v1/health", (req, res) => {
  res.json({ status: "UP" });
});

app.use("/api/v1", mailRouter);

const reboot = async () => {
  setInterval(restartServer, process.env.INTERVAL);
};

app.listen(PORT, () => {
  reboot().then(() => {
    console.log("Server Restarted");
  });
  console.log(`Server is connected to Port ${PORT}`);
});
