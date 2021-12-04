import { ProyectoModel } from "./proyecto.js";

const resolversProyecto ={

    Query:{

        /* HU_006:Como ADMINISTRADOR, QUERY para ver la lista de proyectos registrados */
        Proyectos: async(parent,args)=>{
            const proyectos=await ProyectoModel.find().populate('lider').populate('avances').populate('inscripciones');
            return proyectos;
        },

        Proyecto: async(parent,args)=>{
            const proyecto=await ProyectoModel.findOne({_id:args._id}).populate('lider').populate('avances');
            return proyecto;
        },


        /* HU_013:Como LIDER, QUERY para ver la lista de proyectos que se lideran */
        ProyectosLiderados: async(parent,args)=>{
            const proyectosLideradores=await ProyectoModel.find().populate('avances').populate('inscripciones');
            return proyectosLideradores;
        },
    },

    Mutation:{

        /* HU_012:Como LIDER, MUTATION para crear un nuevo proyecto */
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
            return proyectoCreado;
        },

        /* HU_007,HU_008, HU_009 :Como ADMINISTRADOR, MUTATION para cabmbiar el estado o fase un proyecto */
        aprobarProyecto:  async(parent,args)=>{
            const aprobarProyecto= await ProyectoModel.findByIdAndUpdate(args._id,{
                fase: args.fase,
                estado: args.estado,
                },
                 {new:true} 
                );
            return aprobarProyecto;     
        },

        crearObjetivo: async(parent,args)=>{
            const proyectoConObjetivo= await ProyectoModel.findByIdAndUpdate(args.idProyecto,{
                $addToSet:{  objetivos:{...args.campos}  }
                },{new:true});
            return proyectoConObjetivo;
        },

        editarObjetivo: async(parents,args)=>{
            const proyectoEditado=await ProyectoModel.findByIdAndUpdate(args.idProyecto,{
                $set:{
                    [`objetivos.${args.indexObjetivo}.descripcion`]:args.campos.descripcion,
                    [`objetivos.${args.indexObjetivo}.tipo`]:args.campos.tipo,
                }
            },{new:true}); 
            return proyectoEditado; 
        },

        eliminarObjetivo: async(parents,args)=>{
            const proyectoEditado=await ProyectoModel.findByIdAndUpdate(args.idProyecto,{
                $pull:{
                    objetivos:{
                        _id:args.idObjetivo,
                    },
                },
            },
            {new:true}
            );
            return proyectoEditado;
        },



    }
}

export {resolversProyecto};