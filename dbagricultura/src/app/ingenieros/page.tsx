"use client"
import Image from 'next/image'
import { useState } from "react"
import Axios from "axios";


export default function Home() {

const [nombres, setNombres] = useState("");
const [apellidos, setApellidos] = useState("");
const [sueldo, setSueldo] = useState();
const [telefono, setTelefono] = useState();
const [grado, setGrado] = useState("");
const [id_ingeniero, setId_ingeniero] = useState();

const[editar,setEditar] = useState(false);

const [ingenierosList, setIngenieros] = useState([]);

const add = () => {
  Axios.post("http://localhost:3001/createIngeniero", {
    nombres:nombres,
    apellidos:apellidos,
    sueldo:sueldo,
    telefono:telefono,
    grado:grado
  }).then(() => {
    limpiarCampos();
  });
}

const update = () => {
  Axios.put("http://localhost:3001/updateIngeniero", {
    id_ingeniero:id_ingeniero,
    nombres:nombres,
    apellidos:apellidos,
    sueldo:sueldo,
    telefono:telefono,
    grado:grado
  }).then(() => {
    getIngenieros();
    limpiarCampos();
  });
}

const deleteIngeniero = (id_ingeniero) => {
  Axios.delete(`http://localhost:3001/deleteIngeniero/${id_ingeniero}`).then(() => {
    getIngenieros();
    limpiarCampos();
  });
}

const limpiarCampos = () =>{
  setNombres("");
  setApellidos("");
  setSueldo("");
  setTelefono("");
  setGrado("");
  setEditar(false);
}

const editarIngeniero = (val) =>{
  setEditar(true);

  setNombres(val.nombres);
  setApellidos(val.apellidos);
  setSueldo(val.sueldo);
  setTelefono(val.telefono);
  setGrado(val.grado);
  setId_ingeniero(val.id_ingeniero);
}

const getIngenieros = () => {
  Axios.get("http://localhost:3001/ingenieros",).then((response) => {
    setIngenieros(response.data);

  });
}


  return (
    <main>
      <section className='content-center items-center justify-center m-5'>
        <div className='content-center items-center justify-center m-5'>
          <label className="black-text"> Nombres : 
          <input value={nombres}
          onChange={(event) => {
            setNombres(event.target.value);
          }}
          type="text"/></label><br/>

          <label className="black-text"> Apellidos : 
          <input value={apellidos}
          onChange={(event) => {
            setApellidos(event.target.value);
          }}
          type="text"/></label><br/>

          <label className="black-text">Sueldo : 
          <input value={sueldo}
          onChange={(event) => {
            setSueldo(event.target.value);
          }}
          type="number"/></label><br/>

          <label className="black-text">Telefono : 
          <input value={telefono}
          onChange={(event) => {
            setTelefono(event.target.value);
          }}
          type="number"/></label><br/>

          <label className="black-text">grado : 
          <input value={grado}
          onChange={(event) => {
            setGrado(event.target.value);
          }}
          type="text"/></label><br/>
          <div>
            {
              editar? 
              <div>
              <button onClick={update} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Actualizar</button> 
              <button onClick={limpiarCampos} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Cancelar</button>
              </div>
              :<button onClick={add} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Registrar</button>
            }
          </div>
        </div>
        </section>
        <section>
        <div className="lista black-text">
          <button onClick={getIngenieros}>Listar</button>
          <div className="grid grid-cols-8 sm:grid-cols-8 lg:grid-cols-8 p-2 primary-highlight-text">
            <p>ID</p>
            <p>NOMBRES</p>
            <p>APELLIDOS</p>
            <p>SUELDO</p>
            <p>TELEFONO</p>
            <p>GRADO</p>
          </div>
          {
            ingenierosList.map((val,key) => {
              return <div className=''> 
              <div className="grid grid-cols-8 sm:grid-cols-8 lg:grid-cols-8 p-2">
                <div className="">
                {val.id_ingeniero}
                </div>
                <div className="">
                {val.nombres}
                </div>
                <div className="">
                {val.apellidos}
                </div>
                <div className="">
                {val.sueldo}
                </div>
                <div className="">
                {val.telefono}
                </div>
                <div className="">
                {val.grado}
                </div>
                <div className="">
                <button onClick={()=>{
                  editarIngeniero(val)
                }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Editar</button>
                </div> 
                <div className="">
                  <button onClick={()=>{
                    deleteIngeniero(val.id_ingeniero);
                  }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Eliminar</button>
                </div> 
              </div>
            </div>
            })
          }
        </div>
      </section>
    </main>
  );
}
