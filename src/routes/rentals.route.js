import {Router} from "express";
const router = Router();

import { GetRentals, postRentals } from "../controllers/rentals.controller.js";

import { rentalsValidation } from "../middlewares/rentalsValidation.middleware.js";

router.get("/rentals", GetRentals);

router.post("/rentals", rentalsValidation, postRentals)

export default router;