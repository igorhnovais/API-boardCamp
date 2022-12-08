import {Router} from "express";
const router = Router();

import { getGames, postGames } from "../controllers/games.controller.js";

import { gameSchemaValidation } from "../middlewares/gameSchemaValidation.middleware.js";

router.get("/games", getGames);

router.post("/games", gameSchemaValidation, postGames);

export default router;