"use client"
import Image from 'next/image'
import { useState } from "react"
import Axios from "axios";


export default function Home() {

const [nombres, setNombres] = useState("");
const [apellidos, setApellidos] = useState("");
const [sueldo, setSueldo] = useState(0);
const [telefono, setTelefono] = useState(0);
const [licencia, setLicencia] = useState("");

const add = () => {
  Axios.post("https://localhost:3001/create", {
    nombres:nombres,
    apellidos:apellidos,
    sueldo:sueldo,
    telefono:telefono,
    licencia:licencia
  }).then(() => {
    alert("Operario registrado");
  });
}

  return (
    <main>
      <section>
        <div className='content-center items-center justify-center m-5'>

          <label className="black-text">Nombres : <input 
          onChange={(event) => {
            setNombres(event.target.value);
          }}
          type="text"/></label><br/>

          <label className="black-text">Apellidos : <input 
          onChange={(event) => {
            setApellidos(event.target.value);
          }}
          type="text"/></label><br/>

          <label className="black-text">Sueldo : <input 
          onChange={(event) => {
            setSueldo(event.target.value);
          }}
          type="number"/></label><br/>

          <label className="black-text">Telefono : <input 
          onChange={(event) => {
            setTelefono(event.target.value);
          }}
          type="number"/></label><br/>

          <label className="black-text">Licencia : <input 
          onChange={(event) => {
            setLicencia(event.target.value);
          }}
          type="text"/></label><br/>

          <button onClick={add} className="black-text">Registrar</button>
        </div>
      </section>
    </main>
  );
}
