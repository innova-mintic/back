import mongoose from "mongoose";
import { UsuarioModel } from '../usuario/usuario.js';

const {Schema,model}=mongoose;

const proyectoSchema = new Schema ({
    nombre:{
        type:String,
        required:true,
    },
    presupuesto:{
        type:String,
        required:true,
    },
    fechaInicio:{
        type:Date,
        required:true,
    },
    fechaFin:{
        type:Date,
        required:false,
    },
    estado:{
        type:String,
        enum:["ACTIVO","INACTIVO"],
        default:"INACTIVO"
    },
    fase:{
        type:String,
        enum:["INICIADO","DESAROLLO","TERMINADO","NULO"],
        default:["NULO"]
    },
    lider:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:UsuarioModel,
    },
    objetivos:[
        {
            descripcion:{
                type:String,
                required:true,
            },
            tipo:{
                type:String,
                enum:["GENERAL","ESPECIFICO"],
                required:true,
            },
        },
    ],
    },
    {
        toJSON:{virtuals:true},
        toObject:{virtuals:true}
    }
);

/* Los virtual se hacen en la parte many de la relacion */
proyectoSchema.virtual("avances",{
    ref:"Avance",
    localField:"_id",
    foreignField: "proyecto",
})

proyectoSchema.virtual("inscripciones",{
    ref:"Inscripcion",
    localField:"_id",
    foreignField: "proyecto",
})


const ProyectoModel = model('Proyecto',proyectoSchema,"proyectos");

export {ProyectoModel};