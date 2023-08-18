"use strict";
/*
    API

    Requirements
    -show user information with user's order total amount
    -add person
    -add order
    -delete order
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const mysql2_1 = __importDefault(require("mysql2"));
//import {spices} from './data';
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
const commonResponse = function (data, error) {
    if (error) {
        return {
            title: "assignment week 9",
            author: "Iman maris",
            success: false,
            display: error
        };
    }
    return {
        title: "assignment week 9",
        author: "Iman maris",
        success: true,
        display: data
    };
};
const mysqlCon = mysql2_1.default.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'MySQLku',
    database: 'spices'
});
mysqlCon.connect((err) => {
    if (err)
        throw err;
    console.log("mysql success connected");
});
//===============////======GET ALL==========////===========//
app.get("/pembeli", (req, res) => {
    mysqlCon.query("select*from spices.pembeli", (err, result, fields) => {
        if (err) {
            console.error(err);
            res.status(508).json(commonResponse(null, "server error"));
            res.end();
            return;
        }
        res.status(201).json(commonResponse(result, null));
        res.end();
        //console.log("err", err)
        //console.log("result", result)
    });
});
//=========================GET ALL CLOSE=======================================//
//====================GET by ID========================================//
app.get("/pembeli/:id", (req, res) => {
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
        group by p.id`, id, (err, result, fields) => {
        if (err) {
            console.error(err);
            res.status(508).json(commonResponse(null, "your id order not available"));
            res.end();
            return;
        }
        res.status(201).json(commonResponse(result, null));
        res.end();
        //console.log("err", err)
        //console.log("result", result)
        //console.log("fields", fields)
    });
    //res.json({
    //    success:"Success get all spices order",
    //});
    //res.send("Belajar dulu express");
});
app.post("/pembeli", (req, res) => {
    res.json({
        success: "Success get all spices order",
    });
    //res.send("Belajar dulu express");
});
app.post("/orderanss", (req, res) => {
    const body = req.body;
    mysqlCon.query(`INSERT INTO 
    spices.orderanss
        (
            user_id, 
            spice_name,
            amount_kg,
            rupiah_id 
        )
        VALUES(?, ?, ?, ?)`, [body.user_id, body.spice_name, body.amount_kg, body.rupiah_id], (err, result, fields) => {
        if (err) {
            console.error(err);
            res.status(508).json(commonResponse(null, "server not available"));
            res.end();
            return;
        }
        res.status(201).json(commonResponse({
            id: result.insertId
        }, null));
        res.end();
        // console.log("err", err)
        // console.log("result", result)
        // console.log("fields", fields)
        // res.end()
    });
    //res.send("Belajar dulu express");
});
app.put("/orderanss/:id", (req, res) => {
    const body = req.body;
    mysqlCon.query(`UPDATE 
    spices.orderanss
    SET 
    user_id, 
    spice_name, 
    amount_kg, 
    rupiah_id
    WHERE id=?;
    `, [body.user_id, body.spice_name, body.amount_kg, body.rupiah_id], (err, result, fields) => {
        if (err) {
            console.error(err);
            res.status(508).json(commonResponse(null, "server not available"));
            res.end();
            return;
        }
        res.status(201).json(commonResponse({
            id: id
        }, null));
        res.end();
        // console.log("err", err)
        // console.log("result", result)
        // console.log("fields", fields)
        // res.end()
    });
    //res.send("Belajar dulu express");
});
app.delete('/orderanss/:id', (req, res) => {
    const id = parseInt(req.params.id);
    mysqlCon.query(`DELETE FROM 
        spices.orderanss
    WHERE 
        id=?`, id, (err, result, fields) => {
        if (err) {
            console.error(err);
            res.status(508).json(commonResponse(null, "server not available"));
            res.end();
            return;
        }
        if (result.affectedRows `` == 0) {
            res.status(404).json(commonResponse(null, "data order not available"));
            res.end();
            return;
        }
        res.status(201).json(commonResponse({
            id: id
        }, null));
        res.end();
        //console.log("err", err)
        //res.end()
    });
});
//===================================================//
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
//=======================================================//
