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


const mysqlCon = mysql.createConnection({

    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'MySQLku',
    database: 'spices'
});

mysqlCon.connect((err) => {
    if (err) throw err

    console.log("mysql success connected")
});



//===============////======GET ALL==========////===========//


app.get("/pembeli", (req: Request, res: Response) => {
    mysqlCon.query( "select*from spices.pembeli", (err, result, fields)=>{
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

app.get("/pembeli/:id", (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    mysqlCon.query(`select 
        p.id, 
        p.name, 
        p.address, 
        sum(o.rupiah_id) as total_payment
    from 
        spices.pembeli as p
        left join spices.orderanss as o on p.id = o.user_id
    where 
        p.id = ?
        group by p.id`,id, (err, result, fields) => {
            
            if (err){
                console.error(err)
                res.status(508).json(commonResponse(null, "your id order not available"))
                res.end()
                return
            }
            
            res.status(201).json(commonResponse(
                result,
                null
                ))
                
            res.end()
            
            //console.log("err", err)
            //console.log("result", result)
            //console.log("fields", fields)
                
        });


    //res.json({
    //    success:"Success get all spices order",
        
    //});
    //res.send("Belajar dulu express");
});






app.post("/pembeli", (req: Request, res: Response) => {

    res.json({
        success:"Success get all spices order",
        
    });
    //res.send("Belajar dulu express");
});







app.post("/orderanss", (req: Request, res: Response) => {
    const body = req.body;
    mysqlCon.query(`INSERT INTO 
    spices.orderanss
        (
            user_id, 
            spice_name,
            amount_kg,
            rupiah_id 
        )
        VALUES(?, ?, ?, ?)`
        , [body.user_id, body.spice_name, body.amount_kg, body.rupiah_id], (err, result, fields) => {
           
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


app.put("/orderanss/:id", (req: Request, res: Response) => {
    const body = req.body;
    mysqlCon.query(`UPDATE 
    spices.orderanss
    SET 
    user_id, 
    spice_name, 
    amount_kg, 
    rupiah_id
    WHERE id=?;
    `
        , [body.user_id, body.spice_name, body.amount_kg, body.rupiah_id], (err, result, fields) => {
           
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
 


app.delete('/orderanss/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    mysqlCon.query(`DELETE FROM 
        spices.orderanss
    WHERE 
        id=?`, id, (err, result, fields) => {

            if (err){
                console.error(err)
                res.status(508).json(commonResponse(null, "server not available"))
                res.end()
                return
            }
            
            if(result.affectedRows`` == 0){

                res.status(404).json(commonResponse(null, "data order not available"))
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



//===================================================//
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);

});

//=======================================================//

