import { connection } from "../database/db.js";


export async function getGames(req,res){
    const { name } = req.query;
    const nameQuery = name;
    try{
        if(nameQuery){
            const game = await connection.query(`
            SELECT 
                games.id, games.name, games.image, games."stockTotal", games."pricePerDay", 
                categories.name AS "categoryName"
            FROM 
                games 
            JOIN
                categories
            ON
                games."categoryId"=categories.id          
            WHERE 
                games.name 
            ILIKE 
                '${nameQuery}%';`
            );

            return res.send(game.rows);

        } else {

            const game = await connection.query(`
            SELECT 
                games.id, games.name, games.image, games."stockTotal", games."pricePerDay", 
                categories.name AS "categoryName"
            FROM 
                games 
            JOIN
                categories
            ON
                games."categoryId"=categories.id ;`
            );
            return res.send(game.rows);
        }

    } catch (err){
        console.log(err.message);
        res.status(500).send('Server not running');
    }
}

export async function postGames (req, res){
    const {name, image, stockTotal, categoryId, pricePerDay} = req.info;

    try{
        await connection.query('INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5);', 
        [name, image, stockTotal, categoryId, pricePerDay])
        res.sendStatus(201);

    } catch (err){
        console.log(err.message);
        res.status(500).send('Server not running');
    }
}