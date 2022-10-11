import express from "express";
import SubjectController from "../controllers/SubjectControllers"

let router = express.Router();

router.post("/create", SubjectController.insert);
router.get("/get", SubjectController.getAll);

export default router;