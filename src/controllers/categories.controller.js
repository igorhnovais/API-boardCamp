import { connection } from "../database/db.js" ;


export async function getCategories(req, res){

    try{
        const category = await connection.query("SELECT * FROM categories;");
        res.send(category.rows);

    } catch (err){
        console.log(err.message);
        res.status(500).send('Server not running');
    }
}

export async function postCategories (req,res){
    const {name} = req.body;

    try{ 
        await connection.query("INSERT INTO categories (name) VALUES ($1);", [name]);

        res.sendStatus(201);

    } catch (err){
        console.log(err.message);
        res.status(500).send('Server not running');
    }
}