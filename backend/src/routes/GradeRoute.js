import express from "express";
import GradeController from "../controllers/GradeControllers.js"

let router = express.Router();

router.post("/create", GradeController.insert);
router.get("/get", GradeController.getAll);

export default router;