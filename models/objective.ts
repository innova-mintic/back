import {Schema, model} from 'mongoose';
import { Enum_TipoObjetivo } from './enums';
import { ProjectModel } from './proyect';


interface Objetivo{
    descripcion :string,
    tipo:Enum_TipoObjetivo,
    proyecto:Schema.Types.ObjectId,
}

const objectiveSchema = new Schema<Objetivo> ({
    descripcion:{
        type:String,
        required:true,
    },
    tipo:{
        type:String,
        required:true,
        enum:Enum_TipoObjetivo,
    },
    proyecto:{
        type:Schema.Types.ObjectId,
        ref:ProjectModel
    },
});

const ObjectiveModel = model('Objetivo',objectiveSchema,"objetivos");

export {ObjectiveModel};