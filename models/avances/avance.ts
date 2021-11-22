import { Schema, model, SchemaTimestampsConfig } from "mongoose";
import { ProyectoModel } from "../proyecto/proyecto";
import { UsuarioModel } from "../usuario/usuario";

interface Avance{
    fecha:Date,
    descripcion: string,
    observaciones:[string];
    proyecto: Schema.Types.ObjectId,
    creadoPor: Schema.Types.ObjectId;
}

const avanceSchema=new Schema<Avance>({
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