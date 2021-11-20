import { Schema, model } from "mongoose";
import { Enum_EstadoInscripcion } from "./enums";
import { ProyectoModel } from "./proyect";
import { UsuarioModel } from "./user";


interface Inscripcion{
    estado: Enum_EstadoInscripcion,
    fechaIngreso:Date,
    fechaEgreso:Date,
    proyecto: Schema.Types.ObjectId,
    estudiante: Schema.Types.ObjectId,
}

const InscripcionSchema=new Schema<Inscripcion>({
    estado:{
        type:String,
        enum:Enum_EstadoInscripcion,
        required:true
    },
    fechaIngreso:{
        type:Date,
        required:true
    },
    fechaEgreso:{
        type:Date,
        required:true
    },
    proyecto:{
        type:Schema.Types.ObjectId,
        ref:ProyectoModel,
        required:true
    },
    estudiante:{
        type:Schema.Types.ObjectId,
        ref:UsuarioModel,
        required:true,
    }
})


const InscripcionModel = model("Inscripcion", InscripcionSchema,"inscripciones");

export {InscripcionModel}