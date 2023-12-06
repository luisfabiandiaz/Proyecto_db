const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());

app.use(express.json());
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"agricool"
});

app.post("/create",(req, res) =>{
    const nombres = req.body.nombres;
    const apellidos = req.body.apellidos;
    const sueldo = req.body.sueldo;
    const telefono = req.body.telefono;
    const licencia = req.body.licencia;

    db.query('INSERT INTO operarios(nombres, apellidos, sueldo, telefono, licencia) VALUES(?,?,?,?,?)',
    [nombres, apellidos, sueldo, telefono, licencia],
    (err,result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send("Operario registrado con éxito:3");
        }
    }
    );
});

app.listen(3001,() => {
    console.log("corriendo en el puerto 3001")
})