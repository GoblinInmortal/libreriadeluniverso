import { addDoc, collection } from 'firebase/firestore';
import React, {useState} from 'react'
import {db} from "./firebase";

const AppForm = (props) => {
    ///////////////////////////////////////////////////////////////////////
    ////////// CREAR - fnCrear - Guardar //////////////////////////////////
    ///////////////////////////////////////////////////////////////////////
    const camposRegistro = {nombre:"", edad:"", genero:""};
    const [objeto, setObjeto] = useState(camposRegistro);

    const handleStatusChange = (e) => {      //Manejar cambios en form
        const {name, value} = e.target;
        setObjeto({...objeto, [name]:value });
        console.log(objeto);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        try {
            if(props.idActual === ""){
                if(validarForm()){
                    addDoc(collection(db, 'persona'), objeto);
                    console.log("Se guardo registro en BD...");
                }else{
                    console.log("NO se guardo...");
                }
            }else{
                console.log("ACTUALIZAR REGISTRO..." +props.idActual);
            }
            
        } catch (error) {
            console.error();
        } 
    };
    
    const validarForm = () => {
         if(objeto.nombre === ""){
            alert("Escriba nombre...");
            return false;
         }
         return true;
    };

    ///////////////////////////////////////////////////////////////////////
    ////////// UPDATE - fnUpdate - Actualizar /////////////////////////////
    ///////////////////////////////////////////////////////////////////////

    return (
        <div style={{background:"Gray", padding:"10px", margin:"10px"}}>
            <h3>CREAR / UPDATE</h3>
            <form onSubmit={handleSubmit}>
                <input type="text" name='nombre' placeholder='Nombres...' 
                    onChange={handleStatusChange} value={objeto.nombre}
                />

                <input type="text" name='edad' placeholder='Edad...' 
                    onChange={handleStatusChange} value={objeto.edad}
                />

                <input type="text" name='genero' placeholder='Genero...' 
                    onChange={handleStatusChange} value={objeto.genero}
                />
                <button>
                    {props.idActual === "" ? "Guardar" : "Actualizar" }
                </button>
            </form>
            
        </div>
    )
}

export default AppForm