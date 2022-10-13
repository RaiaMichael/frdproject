import express from "express";
import UserController from "../controllers/UserControllers"

let router = express.Router();

router.post("/create", UserController.register);
router.post("/login", UserController.login);
router.post("/finduser", UserController.findUser);

export default router;