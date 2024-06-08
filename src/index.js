import mongoose from "mongoose";
import express from "express";
import connectDB from "./db/index.js";
import dotenv from "dotenv";
dotenv.config({ path: "./env" });
import { app } from "./app.js";

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`server is running at port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("DB connection failed", error);
  });

/* -----------
const app = express()
(async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("ERRR:", error);
            throw error
        })

        app.listen(process.env.PORT,()=>{
            console.log(`app is listening on port ${process.env.PORT}`);
        })
    } catch (error) {
        console.log(error);
        throw error
    }
})()
----------------- */
