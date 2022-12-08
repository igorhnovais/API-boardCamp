import {Router} from "express";
const router = Router();

import { getCategories, postCategories } from "../controllers/categories.controller.js";

import { categoryValidation } from "../middlewares/categoryValidation.middleware.js";

router.get("/categories", getCategories);

router.post("/categories",categoryValidation, postCategories);

export default router;