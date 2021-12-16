import { UsuarioModel } from "./usuario.js";

const resolversUsuario ={

    Query:{
        /* HU_004:Como ADMINISTRADOR, QUERY para ver la información de los usuarios registrados en la plataforma */
        Usuarios: async (parent,args)=>{
            const usuarios=await UsuarioModel.find().populate([
                {path:'inscripciones',populate:{path:'proyecto',populate:{path:'lider'}}},
                {path:'proyectosLiderados'} 
            ])
            return usuarios;
        },

        Usuario: async(parent,args)=>{
            const usuario=await UsuarioModel.findOne({_id:args._id}).populate('inscripciones');
            return usuario;
        },

        /* HU_010:Como LIDER, QUERY para ver la información de los estudiantes registrados en la plataforma */
        Estudiantes: async (parent,args)=>{
            const estudiantes=await UsuarioModel.find({rol:'ESTUDIANTE'});
            return estudiantes;
        },

        /* HU_013:Como LIDER, QUERY para ver la lista de proyectos que se lideran */
        ProyectosLiderados: async(parent,args)=>{
            const proyectosLiderados=await UsuarioModel.findOne({_id:args._id}).populate('proyectosLiderados');
            return proyectosLiderados;
        },

        /* HU_015:Como LIDER, QUERY para ver solicitudes de inscripcion de los estudiantes a los proyectos */
        SolicitudesInscripcion: async (parent,args)=>{
            const solicitudesInscripcion=await UsuarioModel.findOne({_id:args._id}).populate([
                {path:'proyectosLiderados',populate:{path:'inscripciones',populate:{path:'estudiante'}}}

            ]);
            return solicitudesInscripcion;
        },
    },
        
    Mutation:{
        crearUsuario:async(parent,args)=>{
            const usuarioCreado=await UsuarioModel.create({
                nombre:args.nombre,
                apellido:args.apellido,
                identificacion:args.identificacion,
                correo:args.correo,
                rol:args.rol,
            }   
            );
            if(Object.keys(args).includes('estado')){
                usuarioCreado.estado=args.estado;             
            }

            return  usuarioCreado;
        },
        
        eliminarUsuario: async(parent,args)=>{
            if(Object.keys(args).includes('_id')){
                const usuarioEliminado=UsuarioModel.findOneAndDelete
                    ({
                    _id:args._id
                    });
                return usuarioEliminado;
            }else if(Object.keys(args).includes('correo')){
                const usuarioEliminado=UsuarioModel.findOneAndDelete
                    ({
                    correo:args.correo
                     });
                return usuarioEliminado;
            }  
        },
        
        /* HU_003:Como USUARIO, MUTATION para editar la información personal del perfil */
        editarPerfil:  async(parent,args)=>{
            const perfilEditado= await UsuarioModel.findByIdAndUpdate(args._id,{
                nombre:args.nombre,
                apellido:args.apellido,
                identificacion:args.identificacion,
                correo:args.correo,            
            },
                {new:true}  
            );
            return perfilEditado;     
        },
        
        /* HU_005:Como ADMINISTRADOR, MUTATION para cambiar el estado de un usuario */
        editarUsuario:  async(parent,args)=>{
            const usuarioEditado= await UsuarioModel.findByIdAndUpdate(args._id,{
                estado:args.estado,              
            },
              {new:true}  
            );
            return usuarioEditado;     
        },

        /* HU_011:Como LIDER, MUTATION para cambiar el estado de un estudiante */
        editarEstudiante:  async(parent,args)=>{
            if(Object.keys(args.rol==='ESTUDIANTE')){ 
                const estudianteEditado= await UsuarioModel.findByIdAndUpdate(args._id,{
                    estado:args.estado,              
                },
                    {new:true}  
                );
                return estudianteEditado; 
            }    
        },






    }

}

export {resolversUsuario};