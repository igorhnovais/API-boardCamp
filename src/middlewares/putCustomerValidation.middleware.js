import { connection } from "../database/db.js";
import joi from "joi";

import { customerSchema } from "../models/insertCustomer.models.js";

export async function putCustomerValidation (req, res, next){
    const { id } = req.params
    const info = req.body;

    try{

        const {error} = customerSchema.validate(info, {abortEarly: false});
        
        if(error){
            const errors = error.details.map(detail => detail.message);
            return res.status(422).send(errors);
        }  

        const cpfExist = await connection.query("SELECT * FROM customers WHERE cpf=$1 AND id<>$2;", 
        [info.cpf, id]);

        if (cpfExist.rowCount > 0){
            return res.sendStatus(409);
        }

        const date = joi.date();
        
        try {
            joi.attempt(info.birthday, date);
        } catch {
            return res.sendStatus(400)
        }
            
        req.info = info;

    } catch (err){
        console.log(err.message);
        res.status(500).send('Server not running');
    }

    next();
}