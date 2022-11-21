import { collection, getDocs, query, doc, deleteDoc, where, } from "firebase/firestore";
import { useState } from "react";
import firebase, {db} from './componente/firebase';
import AppForm from "./componente/AppForm";

function App() {
  
  //////////////////// Read  fnRead //////////////////////////
  const [idActual, setIdActual] = useState(""); 
  const fnRead = (e) => {
    console.log("Lectura base de datos"); 
  };
  //////////////////// Delete  fnDelete //////////////////////
  const fnDelete = (e) => {
     console.log("Se elimino con exito...");
  };
  
  return (
    <div style={{background:"orange", padding:"10px", width:"350px"}}>
      <h1>App.js</h1>
      <AppForm {...{idActual, setIdActual, fnRead}}   />
    </div>
  );
}

export default App;