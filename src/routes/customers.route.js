import {Router} from "express";
const router = Router();

import { getCustomers, 
    getCustomersId,
    postCustomer, 
    putCustomer} from "../controllers/customers.controller.js";

import { customerValidation } from "../middlewares/customerValidation.middleware.js";
import { putCustomerValidation } from "../middlewares/putCustomerValidation.middleware.js"


router.get("/customers", getCustomers);

router.get("/customers/:id", getCustomersId);

router.post("/customers", customerValidation, postCustomer);

router.put("/customers/:id", putCustomerValidation, putCustomer);

export default router;