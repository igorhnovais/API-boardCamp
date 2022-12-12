import { connection } from "../database/db.js";

export async function deleteValidation(req, res, next){
    const {id} = req.params;

    try{

        const idExist = await connection.query('SELECT * FROM rentals WHERE id=$1', [id]);

        if (idExist.rowCount === 0){
            return res.sendStatus(404);
        }

        const filled = await connection.query('SELECT "returnDate" FROM rentals WHERE id=$1;', [id]);

        if(!filled.rows[0].returnDate){
            return res.sendStatus(400);
        }

    } catch (err){
        console.log(err.message);
        res.status(500).send('Server not running');
    }

    next();
}