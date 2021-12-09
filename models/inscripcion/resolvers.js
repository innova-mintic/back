import { InscripcionModel } from "./inscripcion.js";


const resolversInscripcion={
    Query:{
        Inscripciones:async(parent,args)=>{
            const inscripciones=await InscripcionModel.find().populate('estudiante');
            return inscripciones;
        }
    },
    Mutation:{
        /* HU_020:Como ESTUDIANTE, MUTATION para incribrir a algun proyecto */
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
        /* HU_016:Como LIDER, MUTATION para aceptar la inscripciones de un estudiante */
        aprobarInscripcion: async (parent,args)=>{
            const inscripcionAprobada= await InscripcionModel.findByIdAndUpdate(args._id,{
                estado:"ACEPTADO",
                fechaIngreso:Date.now(),
            },
                {new:true}
            );
            return inscripcionAprobada;
        }
    }
}

export {resolversInscripcion};