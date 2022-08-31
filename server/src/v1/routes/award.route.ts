import express from "express";
import awardController from "@app/modules/award/award.cotroller";
import authMiddleware from "@app/middlewares/auth.middleware";

const router = express.Router();

router.get("/", authMiddleware, awardController.findAll);

export default router;
