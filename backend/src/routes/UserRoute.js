import express from "express";
import UserController from "../controllers/UserControllers"

let router = express.Router();

router.post("/create", UserController.insert);
router.post("/login", UserController.login);

export default router;