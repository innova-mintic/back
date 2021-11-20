import { Schema, model } from "mongoose";
import { Enum_EstadoInscripcion } from "./enums";
import { ProjectModel } from "./proyect";
import { UserModel } from "./user";


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
        ref:ProjectModel,
        required:true
    },
    estudiante:{
        type:Schema.Types.ObjectId,
        ref:UserModel,
        required:true,
    }
})


const InscripcionModel = model("Inscripcion", InscripcionSchema,"inscripciones");

export {InscripcionModel}