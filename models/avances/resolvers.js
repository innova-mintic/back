import { AvanceModel } from "./avance.js"


const resolversAvances={

    Query:{
        /* HU_017:Como LIDER, QUERY para ver la información de algún proyecto, incluyendo los avances*/
        buscarAvances: async(parent,args)=>{
            const avancesFiltrados= await AvanceModel.find({'proyecto':args._id}).populate('proyecto').populate('creadoPor');
            return avancesFiltrados;
        }
    },

    Mutation:{
        /* HU_022:Como ESTUDIANTE, MUTATION para crear algún avance*/
        crearAvance: async(parent,args)=>{
            const avanceCreado= AvanceModel.create({
                fecha:Date.now(),
                descripcion: args.descripcion,
                proyecto: args.proyecto,
                creadoPor: args.creadoPor,
            });
            return avanceCreado;
        },

        /* HU_023:Como USUARIO, MUTATION para editar algún avance*/
        editarAvance: async(parent,args)=>{
            const avanceEditado =AvanceModel.findByIdAndUpdate(args._id,{
                descripcion:args.descripcion,
                },
                    {new:true}   
                );  
            return avanceEditado
        }
    }
}

export {resolversAvances}