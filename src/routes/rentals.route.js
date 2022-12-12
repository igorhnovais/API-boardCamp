import {Router} from "express";
const router = Router();

import { GetRentals, postRentals, postRentalsFinished, deleteRentals } from "../controllers/rentals.controller.js";

import { rentalsValidation } from "../middlewares/rentalsValidation.middleware.js";
import { deleteValidation } from "../middlewares/deleteRentalsValidation.middleware.js";
import { finishedValidation } from "../middlewares/finishedRental.middleware.js";

router.get("/rentals", GetRentals);

router.post("/rentals", rentalsValidation, postRentals);

router.post("/rentals/:id/return", finishedValidation, postRentalsFinished);

router.delete("/rentals/:id", deleteValidation ,deleteRentals);

export default router;