import { InscripcionModel } from "./inscripcion.js";


const resolversInscripcion={
    Query:{
        Inscripciones:async(parent,args)=>{
            const inscripciones=await InscripcionModel.find();
            return inscripciones;
        }
    },
    Mutation:{
        crearInscripcion:async(parent,args)=>{
            const inscripcionCreada= await InscripcionModel.create({
                proyecto:args.proyecto,
                estudiante:args.estudiante,
            });

            if(Object.keys(args).includes('estado')){
                inscripcionCreada.estado=args.estado;
            }
            return inscripcionCreada;
        },

        aprobarInscripcion: async (parent,args)=>{
            const inscripcionAprobada= await InscripcionModel.findByIdAndUpdate(args._id,{
                estado:"ACEPTADO",
                fechaIngreso:Date.now(),
            });
            return inscripcionAprobada;
        }
    }
}

export {resolversInscripcion};