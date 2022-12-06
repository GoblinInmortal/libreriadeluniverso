import { collection, getDocs, query, doc, deleteDoc, where, onSnapshot} from "firebase/firestore";
//import { getDoc, addDoc, updateDoc, setDoc, increment } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { db } from './componente/firebase';
import AppForm from './componente/AppForm';
import { toast } from 'react-toastify';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {  
  ////////////////////////////////////////////////////////////////////////
  ////////// READ - fnRead - LECTURA BD //////////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  const [idActual, setIdActual] = useState("");     //Para CREAR y UPDATE
  const [docsBD, setDocsBD] = useState([]);         //Para lectura a BD
  const [orden, setOrden] = useState(0);            //Para número - falla
  const i = 1;                                      //Para número - falla
  //console.log(docsBD);  //Comentar sino genera bucle infinito useEffect

  ////////// READ con onSnapshot - Actualiza en TIEMPPO REAL /////////////
  useEffect( () => {
    //const xColeccionConQuery = query(collection(db, "persona"));   //Sin filtro
    const xColeccionConQuery = query(collection(db, "persona"), where("nombre", "!=", ""));
    const unsubscribe = onSnapshot(xColeccionConQuery, (xDatosBD) => {
      const xDoc = [];
      xDatosBD.forEach((doc) => {
        //xDoc.push(doc.data().nombre);             //Datos como "texto" en array
        //xDoc.push(doc.id);                        //Datos "ID" como "texto" en array
        //xDoc.push(doc.data());                    //Datos como "Objeto"
        //xDoc.push({id: doc.id});                  //Datos "ID" como "objeto" con indice "id"
        xDoc.push({id: doc.id, ...doc.data()});     //Datos "union" de "objetos"
      });
      //console.log("Resultado...: ", xDoc.join(", ")); //Comentar sino bucle infinito
      setDocsBD(xDoc);
      //console.log(docsBD);                          //Error lectura debe ser afuera
    });
    //unsubscribe();         //Sólo si función estuviera fuera sino es error llamarlo
  }, [idActual]);

/*
  ////////// READ SIN onSnapshot - NO Actualiza en TIEMPPO REAL //////////
  const fnRead = async () => {
    //const xColeccionConQuery = query(collection(db, "persona"));   //Sin filtro
    const xColeccionConQuery = query(collection(db, "persona"), where("nombre", "!=", ""));
    const xDatosBD = await getDocs(xColeccionConQuery);
    const xDoc = [];
    xDatosBD.forEach((doc) => {
      //xDoc.push(doc.data().nombre);             //Datos como "texto" en array
      //xDoc.push(doc.id);                        //Datos "ID" como "texto" en array
      //xDoc.push(doc.data());                    //Datos como "Objeto"
      //xDoc.push({id: doc.id});                  //Datos "ID" como "objeto" con indice "id"
      xDoc.push({id: doc.id, ...doc.data()});     //Datos "union" de "objetos"
    });
    console.log("Resultado...: ", xDoc.join(", "));
    setDocsBD(xDoc);
    //console.log(docsBD);                        //Error lectura debe ser afuera
  } 

  useEffect( () => {
    fnRead(); 
  }, [idActual])
*/

  ////////////////////////////////////////////////////////////////////////
  ////////// DELETE fnDelete - ELIMINAR //////////////////////////////////
  ////////////////////////////////////////////////////////////////////////
  
  const fnDelete = async (xId) => {
    //console.log(xId);
    if(window.confirm("SE ELIMINARA EL REGISTRO...")){
      await deleteDoc(doc(db, 'persona', xId));
      toast("EL REGISTRO FUE ELIMINADO CORRECTAMENTE", {
        type:'error',
        autoClose: 2000
      })
      //console.log("Se elimino... "+xId);
    }
    //fnRead();   //No es necesario, fue cambiado por otra fn en useEffect
  }

  return (
    <div className="container text-center">
      <div className="card bs-dark p-3 mt-3">

        <ToastContainer />

        <div className="col-md-20 p-4">
          <div className="card mb-1">
          <h1 class="text-success">LIBRERIA DEL UNIVERSO</h1>
            
          </div>
        </div>

        <div className="col-md-12 p-2">
          <AppForm {...{idActual, setIdActual}} />
        </div>
        
        <div className="col-md-12 p-2">
          {
            docsBD.map( (p) => 
              <div className="card mb-1" key={p.id}>
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h4>Nombre: {p.nombre} </h4>
                    <div>
                      <i className="material-icons text-danger"
                        onClick={() => fnDelete(p.id)}>close</i>
                           
                      <i className="material-icons text-warning"
                        onClick={() => setIdActual(p.id)}>create</i>
                    </div>
                  </div>
                  <div className="d-flex justify-content">
                    <span>Edad: {p.edad} </span>   
                    <a href="#"> Genero: {p.genero}</a>
                  </div>
                </div>
              </div>
            ) 
          }
        </div>
        
      </div>
    </div>
  );
}

export default App;