import express, { Router } from "express";
import { saveMenu, getMenu } from "../controllers/auth.controller";

const router = Router();

router.post('/menu', saveMenu);
router.get('/menu', getMenu);

export default router;