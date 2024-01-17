import express from "express";
import router from "./routes/trees.js";
import { config } from "dotenv";
import { connectToDB } from "./data/connectToDB.js";
import cors from "cors";
import userRouter from "./routes/user.js"

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/trees", router);
connectToDB();
config();
app.use("/api/user",userRouter)
let port = process.env.PORT || 3500;
app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
