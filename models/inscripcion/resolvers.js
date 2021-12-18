import { ProyectoModel } from "../proyecto/proyecto.js";
import { UsuarioModel } from "../usuario/usuario.js";
import { InscripcionModel } from "./inscripcion.js";


const resolversInscripcion={

    Inscripcion:{
        proyecto: async(parent,args)=>{
            return await ProyectoModel.findOne({_id:parent.proyecto}).populate('lider');
        },
        estudiante: async(parent,args)=>{
            return await UsuarioModel.findOne({_id:parent.estudiante}).populate('inscripciones');
        }
    },


    Query:{
        Inscripciones:async(parent,args)=>{
            let filtro = {};
            const projects= await ProyectoModel.find({lider:'61ae26807de7e64c94128677'});
            const projectList =projects.map((p)=>p._id.toString());
            filtro ={
                proyecto:{
                    $in:projectList,
                }
            }
            const inscripciones=await InscripcionModel.find({...filtro});
            return inscripciones;
        },
        
        FiltrarInscripcionPorEstudiante:async(parent,args)=>{
            const filtrarInscripcionPorEstudiante=await InscripcionModel.find({'estudiante':args._id});
            return filtrarInscripcionPorEstudiante;
        },

        FiltrarInscripcion:async(parent,args)=>{
            const filtrarInscripcion=await InscripcionModel.findOne({_id:args._id});
            return filtrarInscripcion;
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
                estado:args.estado,
                fechaIngreso:Date.now(),
            },
                {new:true}
            );
            return inscripcionAprobada;
        }
    }
}

export {resolversInscripcion};