import { connection } from "../database/db.js";


export async function finishedValidation (req, res, next){
    const {id} = req.params;
    let feeDelay = 0;

    
    try{
        
        const dayRented = await connection.query('SELECT "rentDate", "gameId", "daysRented", "returnDate" FROM rentals WHERE id=$1;', [id])
        const priceGame = await connection.query('SELECT * FROM games WHERE id=$1;', [dayRented.rows[0].gameId]);
        
        if(dayRented.rowCount === 0){
            return res.sendStatus(404)
        }

        if(dayRented.rows[0].returnDate !== null){
            return res.sendStatus(400);
        }
        
        const now  = new Date();
        const past = new Date(dayRented.rows[0].rentDate); 
        const diff = Math.abs(now.getTime() - past.getTime()); 
        let days = Math.ceil(diff / (1000 * 60 * 60 * 24));
        days = days - dayRented.rows[0].daysRented;

        if(days > 0){
            feeDelay = days * priceGame.rows[0].pricePerDay;
        }
        
        req.info = {feeDelay, id};
        

    } catch (err){
        console.log(err.message);
        res.status(500).send('Server not running');
    }

    next()
}