import { ProyectoModel } from "./proyecto.js";

const resolversProyecto ={

    Query:{

        Proyectos: async(parent,args)=>{
            const proyectos=await ProyectoModel.find().populate('lider').populate('avances').populate('inscripciones');
            return proyectos;
        },

        Proyecto: async(parent,args)=>{
            const proyecto=await ProyectoModel.findOne({_id:args._id}).populate('lider').populate('avances');
            return proyecto;
        },
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
            return proyectoCreado;
        },

        editarProyecto:  async(parent,args)=>{
            const proyectoEditado= await ProyectoModel.findByIdAndUpdate(args._id,{
                nombre:args.nombre,
                presupuesto:args.presupuesto,
                fechaInicio:args.fechaInicio,
                fechaFin:args.fechaFin,
                estado: args.estado,
                fase: args.fase,
                lider:args.lider,
                },
                 {new:true} 
                );
            return proyectoEditado;     
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