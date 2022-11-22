import { collection, onSnapshot, where, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import AppForm from "./componente/AppForm";
import {db} from "./componente/firebase";

function App() {  
  ///////////////////////////////////////////////////////////////////////
  ////////// READ - fnRead - LECTURA A BD ///////////////////////////////
  ///////////////////////////////////////////////////////////////////////
  const [docsBD, setDocsBD] = useState([]);
  //console.log(docsBD);

  const fnRead = () => {
    const xColeccionConQuery = query(collection(db, "persona"));
    //const xColeccionConQuery = query(collection(db, "persona"), where("nombre", "!=", ""));
    const unsubcribe = onSnapshot(xColeccionConQuery, (xDatosBD) => {
      const xDoc = [];
      xDatosBD.forEach( (doc) => {
        xDoc.push({id: doc.id, ...doc.data()});
      });

      setDocsBD(xDoc);
    });
  }

  fnRead();
/*
  useEffect( () => {
    
  }, [] );
  */
  ///////////////////////////////////////////////////////////////////////
  ////////// DELETE - fnDelete - Eliminar registros /////////////////////
  ///////////////////////////////////////////////////////////////////////
  const [idActual, setIdActual] = useState("");

  const fnDelete = (xId) => {
    console.log("Se elimino con exito..."+xId);
  };

  return (
    <div style={{width:"350px", background:"black", padding:"10px"}}>
      <h1>Mi sitio (App.js)</h1>
      <h3>READ / DELETE</h3>
      <AppForm {...{idActual, setIdActual, fnRead}} />
      {
        docsBD.map((row) =>
        <p key={row.id}>
          {row.nombre} ...  
          <span onClick={() => fnDelete(row.id)}> x </span>
          ...
          <span onClick={() => setIdActual(row.id)}> A </span>
        </p>
        )
      }      
    </div>
  );
}

export default App;