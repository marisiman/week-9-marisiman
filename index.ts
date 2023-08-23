/*
    API 

    Requirements
    -show user information with user's order total amount
    -add person
    -add order
    -delete order
*/


import express, {Express, Request, Response} from "express";
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import mysql from "mysql2";
import { devNull } from "os";

//import {spices} from './data';



dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());


//==Common Response==//

const commonResponse = function (data:any, error:any){
    if(error){
        return {
            title : "assignment week 9",
            author : "Iman maris",
            success : false,
            display : error
        }
    }

    return {
        title : "assignment week 9",
        author : "Iman maris",
        success : true,
        display : data
    }
}


// ====== mysql local connection
//const mysqlCon = mysql.createConnection({
//    host: process.env.SQL_HOST,
//    port: process.env.SQL_PORT,
//    user: process.env.SQL_USER,
//    password: process.env.SQL_PWD,
//    database: process.env.SQL_DB
//})


// ====== connect database to railway
//const mysqlCon2 = mysql.createConnection(`mysql://root:EZgPGaB1FTkgUuEFHwTg@containers-us-west-90.railway.app:5752/railway`)
//mysqlCon2.connect((err) => {
//    if (err) throw err
//    console.log("mysql successfully connected")
//});


//==Connect by MySQL==//


const mysqlCon = mysql.createConnection({

    host: 'containers-us-west-62.railway.app',
    port: 6311,
    user: 'root',
    password: 'MH9fzb4pae8QM9Nq2jXH',
    database: 'railway'

    //host: 'mysql-week9-marisiman99-31bd.aivencloud.com',
    //port: 11671,
    //user: 'avnadmin',
    //password: 'AVNS_qCGnwRgGXql0rCPfHmb',
    //database: 'mysql-week9'

    //host: 'localhost',
    //port: 3306,
    //user: 'root',
    //password: 'MySQLku',
    //database: 'spices'
});

mysqlCon.connect((err) => {
    if (err) {
        console.error('Error, cant connect to MySQL: ' + err.stack)
        return;
    }

//    console.log("mysql success connected")
});



//===============////======GET ALL Users==========////===========//


app.get("/users", (req: Request, res: Response) => {
    mysqlCon.query( "select*from `railway`.users", (err, result, fields)=>{
        if (err){
            console.error(err)
            res.status(508).json(commonResponse(null, "server error"))
            res.end()
            return
        }
        
        res.status(201).json(commonResponse(result,null))
        res.end()
        //console.log("err", err)
        //console.log("result", result)

    });    
});

//=========================GET ALL CLOSE=======================================//



app.get("/transactions", (req: Request, res: Response) => {
    mysqlCon.query( "select*from `railway`.transactions", (err, result, fields)=>{
        if (err){
            console.error(err)
            res.status(508).json(commonResponse(null, "server error"))
            res.end()
            return
        }
        
        res.status(201).json(commonResponse(result,null))
        res.end()
        //console.log("err", err)
        //console.log("result", result)

    });    
});

//=========================GET ALL CLOSE=======================================//


//====================GET by ID========================================//

app.get("/users/:id", (req: Request, res: Response) => {
    const id = parseInt(req.params.id);

   // mysqlCon.query('SELECT * FROM FROM spices.pembeli WHERE id = ?', [id], (err, result) => {
   //     if (err) {
   //       return res.status(500).json({ message: 'Internal server error' });
   //     }
   //     if (result.length === 0) {
   //       return res.status(404).json({ message: 'User not found' });
   //     }
   // 
   //     const user = result[0];

    mysqlCon.query(`SELECT 
        u.name , 
        u.address ,
        sum(case when o.type = 'income' then o.amount else -o.amount end) 
        as balance,
        sum(case when o.type ='expense' then o.amount else 0 end) as expense
    FROM 
        railway.users as u 
        left join railway.transactions as o on u.id = o.user_id 
    WHERE
        u.id = ?
        GROUP BY u.id;`,id, (err, result, fields) => {
            
            if (err){
                console.error(err)
                res.status(508).json(commonResponse(null, "your id order not available"))
                res.end()
                return
            }
            
            
            res.status(201).json(commonResponse(
                result[0],
                null
                ))
                
            res.end()
            
            //console.log("err", err)
            //console.log("result", result)
            //console.log("fields", fields)
                
        });

    //});

    //res.json({
    //    success:"Success get all spices order",
        
    //});
    //res.send("Belajar dulu express");
});




//====================POST PEMBELI========================================//

app.post("/users", (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const body = req.body;
    mysqlCon.query(`INSERT INTO 
    railway.users
        (
            id, 
            name,
            nomorPhone,
            address
        )
        VALUES(?, ?, ?, ?)`
        , [body.id, body.name, body.nomorPhone, body.address], (err, result, fields) => {
           
            if (err){
                console.error(err)
                res.status(508).json(commonResponse(null, "server not available"))
                res.end()
                return
            }
            
            res.status(201).json(commonResponse({
                id: id
            },               
                null))
                
            res.end()

           // console.log("err", err)
           // console.log("result", result)
           // console.log("fields", fields)

           // res.end()
        });

    //res.json({
    //    success:"Success get all spices order",
        
    //});
    //res.send("Belajar dulu express");
});

//============================================================//



//====================POST ORDER========================================//

app.post("/transactions", (req: Request, res: Response) => {
    const body = req.body;
    mysqlCon.query(`INSERT INTO 
    railway.transactions
        (
            user_id, 
            type,
            amount
        )
        VALUES(?, ?, ?)`
        , [body.user_id, body.type, body.amount], (err, result, fields) => {
           
            if (err){
                console.error(err)
                res.status(508).json(commonResponse(null, "server not available"))
                res.end()
                return
            }
            
            res.status(201).json(commonResponse({
                id: result.insertId
            },               
                null))
                
            res.end()

           // console.log("err", err)
           // console.log("result", result)
           // console.log("fields", fields)

           // res.end()
        });


       
    //res.send("Belajar dulu express");
});

//============================================================//



//====================PUT ORDER by Id========================================//

app.put("/transactions/:id", (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const {user_id, type, amount} = req.body;
    mysqlCon.query(`UPDATE 
    railway.transactions
    SET 
    user_id=?, 
    type=?, 
    amount=?, 
    WHERE id=?
    `
        ,[user_id, type, amount, id], (err, result, fields) => {
           
            if (err){
                console.error(err)
                res.status(508).json(commonResponse(null, "server not available"))
                res.end()
                return
            }
            
            res.status(201).json(commonResponse({
                id:id
            },               
                null))
                
            res.end()

           // console.log("err", err)
           // console.log("result", result)
           // console.log("fields", fields)

           // res.end()
        });


       
    //res.send("Belajar dulu express");
});
 
//============================================================//



//====================DELETE by ID========================================//

app.delete('/transactions/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    mysqlCon.query(`DELETE FROM 
        railway.transactions
    WHERE 
        id=?`, id, (err, result, fields) => {

            if (err){
                console.error(err)
                res.status(508).json(commonResponse(null, "server not available"))
                res.end()
                return
            }

            res.status(201).json(commonResponse({
                id:id
            },               
                null))
                
            res.end()

           //console.log("err", err)
           //res.end()

        });
});

//============================================================//



//=========================TITLE===============================//

app.get("/", (req: Request, res: Response) => {

    res.send("Assignment Week 9 by Iman");
});

//==============================================================//



//========================LOCAL PORT===========================//
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);

});

//=======================================================//

