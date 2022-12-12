import {connection} from "../database/db.js";

import { rentalSchema } from "../models/insertRental.models.js";

export async function rentalsValidation (req,res, next){

    const info = req.body;

    try{

        const {error} = rentalSchema.validate(info, {abortEarly: false});
        
        if(error){
            const errors = error.details.map(detail => detail.message);
            return res.status(422).send(errors);
        } 

        const customerExist = await connection.query("SELECT * FROM customers WHERE id=$1;", 
        [info.customerId]);

        if (customerExist.rowCount === 0){
            return res.sendStatus(400);
        }

        const gameExist = await connection.query("SELECT * FROM games WHERE id=$1;", 
        [info.gameId]);

        if(gameExist.rowCount === 0){
            return res.sendStatus(400);
        }

        const gameRentals = await connection.query('SELECT * FROM rentals WHERE "gameId"=$1;',
        [info.gameId]);

        if(gameRentals.rowCount >= gameExist.rows[0].stockTotal){
            return res.sendStatus(400);
        }

        req.info = info;

    } catch (err){
        console.log(err.message);
        res.status(500).send('Server not running');
    }
    
    next()
}