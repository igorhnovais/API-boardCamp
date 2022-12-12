import { connection } from "../database/db.js";

export async function getCustomers (req, res){

    const {cpf} = req.query;

    try{
        if(cpf){

            const customer = await connection.query(`SELECT * FROM customers WHERE cpf ILIKE '${cpf}%';`);
            res.send(customer.rows);

        } else {

            const customer = await connection.query("SELECT * FROM customers;");
            res.send(customer.rows);
        }

    } catch (err){
        console.log(err.message);
        res.status(500).send('Server not running');
    }
}

export async function getCustomersId (req, res){

    const { id } = req.params;

    try{

        const customerId = await connection.query("SELECT * FROM customers WHERE id=$1;", [id]);

        if(customerId.rowCount > 0){
            return res.send(customerId.rows[0]);
        } else {
            return res.sendStatus(404);
        }

    } catch (err){
        console.log(err.message);
        res.status(500).send('Server not running');
    }

}

export async function postCustomer (req,res){

    const {name, phone, cpf, birthday} = req.info;

    try{

        await connection.query("INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);",
            [name, phone, cpf, birthday]);

        res.sendStatus(201);

    } catch (err){
        console.log(err.message);
        res.status(500).send('Server not running');
    }
}

export async function putCustomer (req,res){
    const {id} = req.params;
    const {name, phone, cpf, birthday} = req.info;   

    try{

        await connection.query("UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5;", 
        [name, phone, cpf, birthday, id]);

        res.sendStatus(200);

    } catch (err){
        console.log(err.message);
        res.status(500).send('Server not running');
    }
}