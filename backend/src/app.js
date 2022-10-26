import express from "express";
import mongoose from "mongoose";
import routes from "./routes/index.js";
import cors from "cors";
import expressSession from 'express-session'

mongoose
  .connect("mongodb://localhost:27017/kingOfChickenP", {
    useNewUrlParser: true,
  })
  .then(() => {
    const app = express();
    app.use(
      expressSession({
        secret: 'Tecky Academy teaches typescript',
        resave: true,
        saveUninitialized: true,
      }),
    )
    const corsOptions = {
      origin: ["http://localhost:3000"],
    };
    
  
    app.use(cors());
    app.use(cors(corsOptions));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    routes(app);

    app.listen(8080, () => {
      console.log(`Server Started at ${8080}`);
    });
  });