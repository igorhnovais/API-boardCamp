import {Router} from "express";
const router = Router();

import { getCategories } from "../controllers/categories.controller.js";

router.get("/categories", getCategories)