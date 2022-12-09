import {Router} from "express";
const router = Router();

import { getCustomers, 
    getCustomersId,
    postCustomer, } from "../controllers/customers.controller.js";

import { customerValidation } from "../middlewares/customerValidation.middleware.js";


router.get("/customers", getCustomers);

router.get("/customers/:id", getCustomersId);

router.post("/customers", customerValidation, postCustomer);

export default router;