import mongoose from "mongoose";

const {Schema,model}=mongoose;


const usuarioSchema = new Schema({

    correo:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:(email)=>{
                if(email.includes("@")&&email.includes('.')){
                    return true;
                } else{
                    return false;
                }
            },
            message:"El formato del correo esta mal"
        }
    },
    identificacion:{
        type:String,
        required:true,
        unique:true,
    },
    nombre:{
        type:String,
        required:true,
    },
    apellido:{
        type:String,
        required:true,
    },
    rol:{
        type:String,
        required:true,
        enum:["ESTUDIANTE","LIDER","ADMINISTRADOR"],
    },
    estado:{
        type:String,
        default:"PENDIENTE",
        enum:["PENDIENTE","AUTORIZADO","NO_AUTORIZADO"],

    }
});


const UsuarioModel = model('Usuario',usuarioSchema,"usuarios");

export {UsuarioModel};