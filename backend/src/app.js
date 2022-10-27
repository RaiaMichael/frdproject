import express from "express";
import mongoose from "mongoose";
import routes from "./routes/index.js";
import cors from "cors";
import expressSession from 'express-session'
import "dotenv/config"
let env = process.env

mongoose
  .connect(`mongodb://${env.DB_HOST}:${env.DB_PORT}/${env.DB_NAME}`, {
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