import express from "express";
import QuestionController from "../controllers/QuestionControllers"

let router = express.Router();

router.post("/create", QuestionController.insert);
router.post("/findQuestion", QuestionController.findQuestion);
router.post("/submitAnswer", QuestionController.submitAnswer);

export default router;