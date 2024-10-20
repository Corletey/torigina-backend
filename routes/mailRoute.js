import { Router } from "express";
import { contactForm } from "../controllers/mailController.js";

export const mailRouter = Router();

mailRouter.post("/api/contact", contactForm);
