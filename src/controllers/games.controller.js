import { connection } from "../database/db.js";


export async function getGames(req,res){
    const { name } = req.query;

    try{
        if(name){
            const game = await connection.query(`SELECT * FROM games WHERE name ILIKE '${name}%'`);
            res.send(game.rows);

        } else {
            const game = await connection.query("SELECT * FROM games");
            res.send(game.rows);
        }

    } catch (err){
        console.log(err.message);
        res.status(500).send('Server not running');
    }
}

export async function postGames (req, res){
    const {name, image, stockTotal, categoryId, pricePerDay} = req.info;

    try{
        await connection.query('INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)', 
        [name, image, stockTotal, categoryId, pricePerDay])
        res.sendStatus(201);

    } catch (err){
        console.log(err.message);
        res.status(500).send('Server not running');
    }
}