    import { collection, doc, getDoc, addDoc, updateDoc } from "firebase/firestore";
    //import { getDocs, query, setDoc, where, deleteDoc } from "firebase/firestore";
    import React, { useEffect, useState } from 'react';
    import { db } from './firebase';
    import { toast } from "react-toastify";
    import 'react-toastify/dist/ReactToastify.css';

    const AppForm = (props) => {
        ////////////////////////////////////////////////////////////////////////
        ////////// REGISTRAR y ACTUALIZAR //////////////////////////////////////
        ////////////////////////////////////////////////////////////////////////
        const camposRegistro = {nombre:"", edad:"", genero:""}; //Estructura tbl
        const [objeto, setObjeto] = useState(camposRegistro);   //tabla o objeto

        const handleStatusChange = (e) => {           //Maneja cambios en input
            const {name, value} = e.target;           //Capta lo que se escribe
            setObjeto({...objeto, [name]:value });    //asigna al obj name y value
            //console.log(objeto);                    //ver en TIEMPO REAL
        }
    
        const handleSubmit = async (e) => {               //maneja submit (envio)
            try {
                e.preventDefault();                       //evitar por defecto (false)
                ////////// REGISTRAR o ACTUALIZA ////////////////////////////////
                if(props.idActual === ""){
                    //console.log(props.idActual);        //Verificar idActual
                    if(validarForm()){                    //Validar
                        addDoc(collection(db, 'persona'), objeto);      //CREAR
                        //console.log('Se guardó...');      //Msj
                        toast("SE GUARDO CON EXITO...", {
                            type:'success',
                            autoClose: 2000
                        })
                        //props.fnRead();  //No es necesario se cambio fn en useEffect
                    }else{
                        console.log('NO SE GUARDO...');
                    }
                }else{
                    ////////// ACTUALIZAR //////////////////////////////////////////
                    //console.log(objeto);
                    await updateDoc(doc(collection(db, "persona"), props.idActual), objeto);
                    //console.log("Se actualizó... ");
                    toast("SE ACTUALIZO CON EXITO!!", {
                        type:'info',
                        autoClose: 2000
                    })
                    //props.fnRead();           //No es necesario se cambio fn en useEffect
                    props.setIdActual('');                //Limpiar pedido
                }
                setObjeto(camposRegistro);                //limpiar objeto
            } catch (error) {
                console.log("Error en CREAR o UPDATE: ", error);
            }
        }
        ////////// VALIDACIÓN //////////////////////////////////////////////////
        const validarForm = () => {
            if(objeto.nombre==="" || /^\s+$/.test(objeto.nombre)){
                //alert("Escriba nombres...");
                toast("LLENE EL FORMULARIO", {
                    type:'warning',
                    autoClose: 2000
                })
                return false;                         //Si no tiene texto
            }
            return true;                              //Si tiene texto
        };

        ////////////////////////////////////////////////////////////////////////
        ////////// OBTENER registro por idActual ///////////////////////////////
        ////////////////////////////////////////////////////////////////////////
        //console.log("props.idActual", props.idActual);
        useEffect(() => {
            if( props.idActual === ""){               //Si no hay q' id Update
                setObjeto({...camposRegistro});       //
            }else{
                obtenerDatosPorId(props.idActual);    //Obtiene REGISTRO de BD
            }
        }, [props.idActual]);

        const obtenerDatosPorId = async (xId) =>{
            //console.log("xId ", xId);               //Id a actualizar    
            const objPorId = doc(db, "persona", xId); //Obtiene por tabla
            const docPorId = await getDoc(objPorId);  //fn para obtener
            if (docPorId.exists()) {
                //console.log("Datos de doc... ", docPorId.data());
                setObjeto(docPorId.data());           //Pasando datos a variable
            } else {
                console.log("No hay doc... ");        //
            }
        }
        //console.log(objeto);

        return (
            <div>
            <form className="card card-body" onSubmit={handleSubmit}>
                <button className="btn btn-success btn-block"> 
                    REGISTRAR
                </button>
                <div className="form-group input-group">
                    <div className="input-group-text bd-light">
                        <i className="material-icons">group_add</i>
                    </div>
                    <input type="text" className="form-control" name="nombre" placeholder="Nombres..."
                        onChange={handleStatusChange} value={objeto.nombre} />
                </div>
                <div className="form-group input-group clearfix">
                    <div className="input-group-text bd-light ">
                        <i className="material-icons">star_half</i>
                    </div>
                    <input type="text" className="form-control float-start" name="edad" placeholder="Edad..."
                        onChange={handleStatusChange} value={objeto.edad} />
                </div>
                <div className="form-group input-group">
                    <div className="input-group-text bd-light">
                        <i className="material-icons">insert_link</i>
                    </div>
                    <input type="text" className="form-control" name="genero" placeholder="Género..."
                        onChange={handleStatusChange} value={objeto.genero} />
                </div>
                <button className="btn btn-success btn-block"> 
                    {props.idActual === ""? "Guardar" : "Actualizar"} 
                </button>
            </form>
            </div>
        )
    }

    export default AppForm;
