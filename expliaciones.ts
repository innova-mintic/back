import conectarBD from "./db/db";
import {UsuarioModel} from "./models/usuario/usuario";
import { Enum_EstadoUsuario, Enum_Rol, Enum_TipoObjetivo } from "./models/enums/enums";
import { ProyectoModel } from "./models/proyecto/proyecto";
import { ObjectId } from "mongoose";
import { ObjectiveModel } from "./models/objective";
    

const main = async () =>{
    await conectarBD();


    const usuarioInicial= await UsuarioModel.create({
        nombre:'Fulano', 
        apellido:'lano',
        correo:'fulano@hotmail.com',
        identificacion:'12334' ,
        rol: Enum_Rol.administrador,
        estado: Enum_EstadoUsuario.autorizado,
    });

    const proyectoCreado= await ProyectoModel.create({
        nombre:"Proyecto 1",
        presupuesto:120,
        fechaInicio: Date.now(),
        fechaFin: new Date("2022/11/10"),
        lider:usuarioInicial._id,
        objetivos:[
            {descripcion:"Objetivo general",tipo:Enum_TipoObjetivo.general },
            {descripcion:"Objetivo esp 1",tipo:Enum_TipoObjetivo.especifico },   
            {descripcion:"Objetivo esp 2",tipo:Enum_TipoObjetivo.especifico },
        ],
    });

    const consultarProyecto = await ProyectoModel.find({nombre:"Proyecto 1"})
    console.log('el proyecto es:',consultarProyecto);

};

main();

    //C R U D    U S U A R I O S 
/*     //CREAR USUARIO
    await UserModel.create({
        correo:"besttss@hot.com",
        identificacion:"33310",
        nombre:"bes",
        apellido:"acas",
        rol:Enum_Rol.lider,
        })
        .then((u)=>{
            console.log("usuario creado",u);
        })
        .catch(e=>{
            console.log("Error creado el usuario",e)
        });

    // OBTENER LOS USUARIOS
    await UserModel.find().then((u)=>{
        console.log("usuarios",u);
        }).catch(e=>{
            console.error("error obteniendo los usuarios",e)
        });



    //EDITAR UN USUARIO
    await UserModel.findOneAndUpdate(
        {correo:"andres@hot.com"},
    {
        nombre:"Juan",
        apellido:"Lopez",
        })
        .then((u)=>{
            console.log("usuario actualizado",u);
        })
        .catch(e=>()=>{
            console.error("error actualizando",e);
        });

    //ELIMINAR UN USUARIO
    await UserModel.findOneAndDelete(
        {correo:"andres@hot.com"})
        .then((u)=>{
            console.log("usuario eliminado",u);
        })
        .catch(e=>()=>{
            console.error("error eliminando",e);
        }); */

