import React, { useState } from 'react';

const AppForm = (props) => {
    //////////////////// Create  fnCreate //////////////////////
    const camposRegistro ={nombre:"", edad:"", genero:""}; //Estructura del objeto (Tabla)
    const [objeto, setObjeto] = useState(camposRegistro); //Tabla o objeto

    const handleStatusChange = (e) => {
        const {name, value} = e.target;
        setObjeto({...objeto, [name]:value });
        console.log(objeto);
    };

    const handleSubmit = (e) => {   
        e.preventDefault();
        //////// Registrar //////////
        if(props.idActual === ""){
            console.log(props.idActual);
            if(validarForm()){
                addDoc(collection(db, 'persona'), objeto); //CREAR
                console.log('Se guardo...');
                props.fnRead();
            }else{
                console.log('No se guardó...');
            }
        }else{
        }
        setObjeto(camposRegistro); // Limpiar objeto
        console.log("Maneja envio");
    }

    const validarForm  = (e) => {
        if(objeto.nombre ==="" || /^\s+$/.test(objeto.nombre)){
            alert("Escriba nombres...");
            return false;
        }
        return true;
    };

    //////////////////// Update  fnUpdate //////////////////////
    return (
        <div style={{background:"yellow", padding:"10px", margin:"10px"}}>
            <h1>AppForm.js</h1>
            <form onSubmit ={handleSubmit}>   
                <input type ="text" name = "nombre" placeholder = "Escriba Completo..."
                onChange = {handleStatusChange} value = {objeto.nombre}/> <br/>
                <button>
                    {props.idActual === ""? "Guarda" : "Actualizar"}
                </button>
            </form>
        </div>
    )
}

export default AppForm;
