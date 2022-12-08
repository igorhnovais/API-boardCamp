import { connection } from "../database/db.js" ;

export async function getCategories(req, res){
    try{
        const category = await connection.query("SELECT * FROM categories");
        res.send(category.rows);

    } catch (err){
        console.log(err);
        res.status(500).send('Server not running');
    }
}