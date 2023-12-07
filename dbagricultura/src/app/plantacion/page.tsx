"use client"
import Image from 'next/image'
import { useState } from "react"
import Axios from "axios";
import Link from "next/link";

export default function Home() {

const [fcha_inicio, setFcha_inicio] = useState("");
const [fcha_cosecha, setFcha_cosecha] = useState("");
const [id_variedad, setId_variedad] = useState();
const [id_plantacion, setId_plantacion] = useState();

const[editar,setEditar] = useState(false);

const [plantacionList, setPlantacion] = useState([]);

const [variedadList, setVariedad] = useState([]);

const getVariedad = (id_variedad) => {
    Axios.get(`http://localhost:3001/variedad/${id_variedad}`,).then((response) => {
    setVariedad(response.data);

    });
}

const add = () => {
  Axios.post("http://localhost:3001/createPlantacion", {
    fcha_inicio:fcha_inicio,
    fcha_cosecha:fcha_cosecha,
    id_variedad:id_variedad,
  }).then(() => {
    limpiarCampos();
  });
}

const update = () => {
  Axios.put("http://localhost:3001/updatePlantacion", {
    id_plantacion:id_plantacion,
    fcha_inicio:fcha_inicio,
    fcha_cosecha:fcha_cosecha,
    id_variedad:id_variedad,
  }).then(() => {
    getPlantacion();
    limpiarCampos();
  });
}

const deletePlantacion = (id_plantacion) => {
  Axios.delete(`http://localhost:3001/deletePlantacion/${id_plantacion}`).then(() => {
    getPlantacion();
    limpiarCampos();
  });
}

const limpiarCampos = () =>{
  setFcha_inicio("");
  setFcha_cosecha("");
  setId_variedad("");
  setEditar(false);
}

const editarPlantacion = (val) =>{
  setEditar(true);

  setFcha_inicio(val.fcha_inicio);
  setFcha_cosecha(val.fcha_cosecha);
  setId_variedad(val.id_variedad);
  setId_plantacion(val.id_plantacion);
}

const getPlantacion = () => {
  Axios.get("http://localhost:3001/plantaciones",).then((response) => {
    setPlantacion(response.data);

  });
}

  
  return (
    <main>
      <section className='content-center items-center justify-center m-5'>
        <div className='content-center items-center justify-center m-5'>
          <label className="black-text"> Fcha_inicio : 
          <input value={fcha_inicio}
          onChange={(event) => {
            setFcha_inicio(event.target.value);
          }}
          type="date"/></label><br/>

          <label className="black-text"> Fcha_cosecha : 
          <input value={fcha_cosecha}
          onChange={(event) => {
            setFcha_cosecha(event.target.value);
          }}
          type="date"/></label><br/>

          <label className="black-text">Id_variedad : 
          <input value={id_variedad}
          onChange={(event) => {
            setId_variedad(event.target.value);
          }}
          type="number"/></label><br/>

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
          <button onClick={getPlantacion}>Listar</button>
          <div className="grid grid-cols-6 sm:grid-cols-6 lg:grid-cols-6 p-2 primary-highlight-text">
            <p>ID</p>
            <p>FCHA_INICIO</p>
            <p>FCHA_COSECHA</p>
            <p>ID_VARIEDAD</p>
          </div>
          {
            plantacionList.map((val,key) => {
              return <div className=''> 
              <div className="grid grid-cols-7 sm:grid-cols-7 lg:grid-cols-7 p-2">
                <div className="">
                {val.id_plantacion}
                </div>
                <div className="">
                {val.fcha_inicio}
                </div>
                <div className="">
                {val.fcha_cosecha}
                </div>
                <div className="">
                {val.id_variedad}
                </div>
                <div className="">
                <button onClick={()=>{
                  editarPlantacion(val)
                }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Editar</button>
                </div> 
                <div className="">
                  <button onClick={()=>{
                    deletePlantacion(val.id_plantacion);
                  }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Eliminar</button>
                </div> 
                <div className="">
                    <button onClick={()=>{
                    getVariedad(val.id_variedad);
                  }}className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Mas informacion</button>
                </div>
              </div>
            </div>
            })
          }
          {
            variedadList.map((val,key) => {
              return <div className=''>
                <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-4 p-2 primary-highlight-text">
                    <p>NOMBRE</p>
                    <p>DESCRIPCION</p>
                    <p>CLIMA IDEAL</p>
                    <p>ID_planta</p>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-4 p-2">
                    <div>
                    {val.nombre}
                    </div>
                    <div>
                    {val.descripcion}
                    </div>
                    <div>
                    {val.clima}
                    </div>
                    <div>
                    {val.id_planta}
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
