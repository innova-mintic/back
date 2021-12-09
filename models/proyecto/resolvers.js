import { ProyectoModel } from "./proyecto.js";


const resolversProyecto ={

    Query:{

        /* HU_006:Como ADMINISTRADOR, QUERY para ver la lista de proyectos registrados */
        Proyectos: async(parent,args)=>{
            const proyectos=await ProyectoModel.find().populate([
                { path:'lider'},{ path:'avances'},{path:'inscripciones', populate:{path:'estudiante'}},
            ])
            return proyectos;
        },

        Proyecto: async(parent,args)=>{
            const proyecto=await ProyectoModel.findOne({_id:args._id}).populate('lider').populate('avances');
            return proyecto;
        },

        
        FiltrarProyectoPorLider:async(parents,args)=>{
            const filtrarProyectoPorLider=await ProyectoModel.find({'lider':args._id}).populate('lider');
            return filtrarProyectoPorLider
        }

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

        /* HU_012:Como LIDER, MUTATION para crear un nuevo proyecto */
       crearObjetivo: async(parent,args)=>{
           const proyectoConObjetivo= await ProyectoModel.findByIdAndUpdate(args.idProyecto,{
               $addToSet:{  objetivos:{...args.campos}  }
               },{new:true});
           return proyectoConObjetivo;
       },

        /* HU_007,HU_008, HU_009 :Como ADMINISTRADOR, MUTATION para cambiar el estado o fase un proyecto */
        aprobarProyecto:  async(parent,args)=>{
            const aprobarProyecto= await ProyectoModel.findByIdAndUpdate(args._id,{
                fase: args.fase,
                estado: args.estado,
                },
                 {new:true} 
                );
            return aprobarProyecto;     
        },

        /* HU_014:Como LIDER, MUTATION para cambiar informacion de los proyectos activos */
        editarProyecto:  async(parent,args)=>{
            if(Object.keys(args.estado==='ACTIVO')){ 
                const proyectoEditado= await ProyectoModel.findByIdAndUpdate(args._id,{
                    nombre:args.nombre,
                    presupuesto:args.presupuesto,            
                },
                    {new:true}  
                );
                return proyectoEditado; 
            }    
        },        
        /* HU_014:Como LIDER, MUTATION para cambiar informacion de los proyectos activos */
        editarObjetivo: async(parents,args)=>{
            const proyectoEditado=await ProyectoModel.findByIdAndUpdate(args.idProyecto,{
                $set:{
                    [`objetivos.${args.indexObjetivo}.descripcion`]:args.campos.descripcion,
                    [`objetivos.${args.indexObjetivo}.tipo`]:args.campos.tipo,
                }
            },{new:true}); 
            return proyectoEditado; 
        },
        
        /* HU_014:Como LIDER, MUTATION para cambiar informacion de los proyectos activos */
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