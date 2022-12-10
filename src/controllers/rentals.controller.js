import { connection } from "../database/db.js";
import dayjs from "dayjs";

export async function GetRentals (req, res){

    const {customerId, gameId} = req.params;

    const rentalQuery = `
        SELECT 
            rentals.*,
        ROW_TO_JSON
            (customers.*) AS customer, 
        JSON_BUILD_OBJECT(
            'id',games.id,
            'name',games.name,
            'categoryId',games."categoryId",
            'categoryName',categories.name
            ) AS game 
        FROM 
            rentals
        JOIN 
            customers
        ON 
            customers.id ="customerId"
        JOIN 
            games 
        ON 
            games.id = "gameId" 
        JOIN 
            categories 
        ON 
            categories.id = games."categoryId"
        `

    try{
        if(customerId && gameId){
            const data = await connection.query(`
                ${rentalQuery}
                WHERE
                    "customerId"=$1, gameId=$2
            `, [customerId, gameId]);

           return res.send(data.rows);

        } else if (customerId && !gameId){

            const data = await connection.query(`
                ${rentalQuery}
                WHERE
                    "customerId"=$1
            `, [customerId]);

           return res.send(data.rows);

        } else if (!customerId && gameId){

            const data = await connection.query(`
                ${rentalQuery}
                WHERE
                    "gameId"=$1
            `, [gameId]);

           return res.send(data.rows);

        } else {

            const data = await connection.query(`${rentalQuery}`);

            return res.send(data.rows);
        }

    } catch (err){
        console.log(err.message);
        res.status(500).send('Server not running');
    }
};

export async function postRentals (req,res){
    const { customerId, gameId, daysRented } = req.info;
    const day = dayjs().format("YYYY-MM-DD");

    try{
        const priceGame = await connection.query('SELECT "pricePerDay" FROM games WHERE id=$1', [gameId]);
        const priceId = Number(priceGame.rows[0].pricePerDay) * Number(daysRented);

        await connection.query(`
        INSERT INTO 
            rentals ("customerId", "gameId", "daysRented", "returnDate", "delayFee", "originalPrice", "rentDate") 
        VALUES ($1, $2, $3, $4, $5, $6, $7)`, 
        [customerId, gameId, daysRented, null, null, priceId, day]);

        res.sendStatus(201);

    } catch (err){
        console.log(err.message);
        res.status(500).send('Server not running');
    }
}