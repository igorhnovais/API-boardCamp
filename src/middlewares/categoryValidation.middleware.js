import { connection } from "../database/db.js" ;

import { categorySchema } from "../models/insertCategory.models.js";

export async function categoryValidation(req, res, next){

    const info = req.body;

    try{

        const {error} = categorySchema.validate(info, {abortEarly: false});

        if(error){
            const errors = error.details.map(detail => detail.message);
            return res.status(422).send(errors);
        }

        const categoryExist = await connection.query("SELECT name FROM categories WHERE name=$1;", [info.name]);

        if (categoryExist.rowCount > 0){
            return res.sendStatus(409);
        }

    } catch (err){
        console.log(err.message);
        res.status(500).send('Server not running');
    }

    next();
}