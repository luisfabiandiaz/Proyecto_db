"use client"
import Image from 'next/image'
import { useState } from "react"
import Axios from "axios";


export default function Home() {

const [nombres, setNombres] = useState("");
const [apellidos, setApellidos] = useState("");
const [sueldo, setSueldo] = useState();
const [telefono, setTelefono] = useState();
const [licencia, setLicencia] = useState("");
const [id_operario, setId_operario] = useState();

const[editar,setEditar] = useState(false);

const [operariosList, setOperarios] = useState([]);

const add = () => {
  Axios.post("http://localhost:3001/createOperario", {
    nombres:nombres,
    apellidos:apellidos,
    sueldo:sueldo,
    telefono:telefono,
    licencia:licencia
  }).then(() => {
    limpiarCampos();
  });
}

const update = () => {
  Axios.put("http://localhost:3001/updateOperario", {
    id_operario:id_operario,
    nombres:nombres,
    apellidos:apellidos,
    sueldo:sueldo,
    telefono:telefono,
    licencia:licencia
  }).then(() => {
    getOperarios();
    limpiarCampos();
  });
}

const deleteOperariostodo = () => {
  Axios.delete("http://localhost:3001/deleteOperariostodo").then(() => {
    getOperarios();
    limpiarCampos();
  });
}

const deleteOperario = (id_operario) => {
  Axios.delete(`http://localhost:3001/deleteOperario/${id_operario}`).then(() => {
    getOperarios();
    limpiarCampos();
  });
}

const limpiarCampos = () =>{
  setNombres("");
  setApellidos("");
  setSueldo("");
  setTelefono("");
  setLicencia("");
  setEditar(false);
}

const editarOperario = (val) =>{
  setEditar(true);

  setNombres(val.nombres);
  setApellidos(val.apellidos);
  setSueldo(val.sueldo);
  setTelefono(val.telefono);
  setLicencia(val.licencia);
  setId_operario(val.id_operario);
}

const getOperarios = () => {
  Axios.get("http://localhost:3001/operarios",).then((response) => {
    setOperarios(response.data);

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

          <label className="black-text">Licencia : 
          <input value={licencia}
          onChange={(event) => {
            setLicencia(event.target.value);
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
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 p-2 primary-highlight-text">
            <button onClick={getOperarios} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded m-10">
              lista
            </button>
            <button onClick={deleteOperariostodo} className="bg-blue-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded m-10">
              borrar todo
            </button>
            </div>
          <div className="grid grid-cols-8 sm:grid-cols-8 lg:grid-cols-8 p-2 primary-highlight-text">
            <p>ID</p>
            <p>NOMBRES</p>
            <p>APELLIDOS</p>
            <p>SUELDO</p>
            <p>TELEFONO</p>
            <p>LICENCIA</p>
          </div>
          {
            operariosList.map((val,key) => {
              return <div className=''> 
              <div className="grid grid-cols-8 sm:grid-cols-8 lg:grid-cols-8 p-2">
                <div className="">
                {val.id_operario}
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
                {val.licencia}
                </div>
                <div className="">
                <button onClick={()=>{
                  editarOperario(val)
                }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Editar</button>
                </div> 
                <div className="">
                  <button onClick={()=>{
                    deleteOperario(val.id_operario);
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