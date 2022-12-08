import { connection } from "../database/db.js";

export async function getCustomers (req, res){

    const {cpf} = req.query

    try{
        if(cpf){

            const customer = await connection.query(`SELECT * FROM customers WHERE cpf ILIKE '${cpf}%'`);
            res.send(customer.rows);
            
        } else {

            const customer = await connection.query("SELECT * FROM customers");
            res.send(customer.rows);
        }

        

    } catch (err){
        console.log(err.message);
        res.status(500).send('Server not running');
    }
}