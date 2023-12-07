const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require('cors');

app.use(cors());

app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"agripro"
});

app.post("/createOperario",(req, res) =>{
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
            res.send(result);
        }
    }
    );
});

app.get("/operarios",(req, res) =>{
    db.query('SELECT * FROM operarios',
    (err,result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    }
    );
});

app.put("/updateOperario",(req, res) =>{
    const id_operario = req.body.id_operario;
    const nombres = req.body.nombres;
    const apellidos = req.body.apellidos;
    const sueldo = req.body.sueldo;
    const telefono = req.body.telefono;
    const licencia = req.body.licencia;

    db.query('UPDATE operarios SET nombres=?, apellidos=?, sueldo=?, telefono=?, licencia=? WHERE id_operario=?',
    [nombres, apellidos, sueldo, telefono, licencia, id_operario],
    (err,result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    }
    );
});

app.delete("/deleteOperario/:id_operario",(req, res) =>{
    const id_operario = req.params.id_operario;
    
    db.query('DELETE FROM operarios WHERE id_operario=?',id_operario,
    (err,result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    }
    );
});
//ingeniero
app.post("/createIngeniero",(req, res) =>{
    const nombres = req.body.nombres;
    const apellidos = req.body.apellidos;
    const sueldo = req.body.sueldo;
    const telefono = req.body.telefono;
    const grado = req.body.grado;

    db.query('INSERT INTO ingenieros(nombres, apellidos, sueldo, telefono, grado) VALUES(?,?,?,?,?)',
    [nombres, apellidos, sueldo, telefono, grado],
    (err,result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    }
    );
});

app.get("/ingenieros",(req, res) =>{
    db.query('SELECT * FROM ingenieros',
    (err,result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    }
    );
});

app.put("/updateIngeniero",(req, res) =>{
    const id_ingeniero = req.body.id_ingeniero;
    const nombres = req.body.nombres;
    const apellidos = req.body.apellidos;
    const sueldo = req.body.sueldo;
    const telefono = req.body.telefono;
    const grado = req.body.grado;

    db.query('UPDATE ingenieros SET nombres=?, apellidos=?, sueldo=?, telefono=?, grado=? WHERE id_ingeniero=?',
    [nombres, apellidos, sueldo, telefono, grado, id_ingeniero],
    (err,result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    }
    );
});

app.delete("/deleteIngeniero/:id_ingeniero",(req, res) =>{
    const id_ingeniero = req.params.id_ingeniero;
    
    db.query('DELETE FROM ingenieros WHERE id_ingeniero=?',id_ingeniero,
    (err,result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    }
    );
});
//plantacion
app.get("/variedad/:id_variedad",(req, res) =>{
    const id_variedad = req.params.id_variedad;
    db.query('SELECT * FROM variedades WHERE id_variedad=?',id_variedad,
    (err,result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    }
    );
});

app.post("/createPlantacion",(req, res) =>{
    const fcha_inicio = req.body.fcha_inicio;
    const fcha_cosecha = req.body.fcha_cosecha;
    const id_variedad = req.body.id_variedad;

    db.query('INSERT INTO plantaciones(fcha_inicio, fcha_cosecha, id_variedad) VALUES(?,?,?)',
    [fcha_inicio, fcha_cosecha, id_variedad],
    (err,result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    }
    );
});

app.get("/plantaciones",(req, res) =>{
    db.query('SELECT * FROM plantaciones',
    (err,result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    }
    );
});

app.put("/updatePlantacion",(req, res) =>{
    const id_plantacion = req.body.id_plantacion;
    const fcha_inicio = req.body.fcha_inicio;
    const fcha_cosecha = req.body.fcha_cosecha;
    const id_variedad = req.body.id_variedad;

    db.query('UPDATE plantaciones SET fcha_inicio=?, fcha_cosecha=?, id_variedad=? WHERE id_plantacion=?',
    [fcha_inicio, fcha_cosecha, id_variedad, id_plantacion],
    (err,result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    }
    );
});

app.delete("/deletePlantacion/:id_plantacion",(req, res) =>{
    const id_plantacion = req.params.id_plantacion;
    
    db.query('DELETE FROM plantaciones WHERE id_plantacion=?',id_plantacion,
    (err,result) => {
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    }
    );
});


app.listen(3001,() => {
    console.log("corriendo en el puerto 3001")
})
