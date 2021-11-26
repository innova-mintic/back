import { AvanceModel } from "./avance.js"


const resolversAvances={

    Query:{
        Avances: async(parent,args)=>{
            const avances= await AvanceModel.find().populate('proyecto').populate('creadoPor');
            return avances;
        }

    },

    Mutation:{
        crearAvance: async(parent,args)=>{
            const avanceCreado= AvanceModel.create({
                fecha:args.fecha,
                descripcion: args.descripcion,
                proyecto: args.proyecto,
                creadoPor: args.creadoPor,
            });
            return avanceCreado;
        }
    }
}

export {resolversAvances}