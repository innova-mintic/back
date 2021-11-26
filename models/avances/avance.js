import mongoose from "mongoose";
import { ProyectoModel } from "../proyecto/proyecto.js";
import { UsuarioModel } from "../usuario/usuario.js";

const {Schema,model}=mongoose;

const avanceSchema=new Schema({
    fecha:{
        type:Date,
        required:true,
    },
    descripcion:{
        type:String,
        required:true,
    },
    observaciones:[
        {
            type:String,
        }
    ],
    proyecto:{
        type:Schema.Types.ObjectId,
        ref: ProyectoModel,
        required:true, 
    },
    creadoPor:{
        type: Schema.Types.ObjectId,
        ref:UsuarioModel,
        required:true,
    },
});

const AvanceModel = model("Avance", avanceSchema,"avances");

export {AvanceModel}