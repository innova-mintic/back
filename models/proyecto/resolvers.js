import { ProyectoModel } from "./proyecto.js";

const resolversProyecto ={

    Query:{

        Proyectos: async(parent,args)=>{
            const proyectos=await ProyectoModel.find().populate('lider').populate('avances').populate('inscripciones');
            return proyectos;
        }
    },
    Mutation:{

        crearProyecto: async(parent,args)=>{
            const proyectoCreado= await ProyectoModel.create({
                nombre:args.nombre,
                estado:args.estado,
                fase:args.fase,
                fechaInicio:args.fechaInicio,
                fechaFin:args.fechaFin,
                presupuesto:args.presupuesto,
                objetivos:args.objetivos,
                lider:args.lider,

            });
            return proyectoCreado
        }
    }

}

export {resolversProyecto};