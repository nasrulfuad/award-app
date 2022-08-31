import express from "express";
import userController from "@app/modules/user/user.controller";

const router = express.Router();

router.post("/login", userController.login);

export default router;
