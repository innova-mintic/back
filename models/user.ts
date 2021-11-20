import {Schema, model} from 'mongoose';
import {Enum_Rol,Enum_EstadoUsuario} from './enums';


interface Usuario{
    correo:string,
    identificacion:string,
    nombre:string,
    apellido:string,
    rol:Enum_Rol;
    estado:Enum_EstadoUsuario
}

const usuarioSchema = new Schema<Usuario> ({

    correo:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:(email)=>{
                if(email.includes("@")&&email.includes('.')){
                    return true;
                } else{
                    return false;
                }
            },
            message:"El formato del correo esta mal"
        }
    },
    identificacion:{
        type:String,
        required:true,
        unique:true,
    },
    nombre:{
        type:String,
        required:true,
    },
    apellido:{
        type:String,
        required:true,
    },
    rol:{
        type:String,
        required:true,
        enum:Enum_Rol,
    },
    estado:{
        type:String,
        default:Enum_EstadoUsuario.PENDIENTE,
        enum:Enum_EstadoUsuario,

    }
});


const UsuarioModel = model('Usuario',usuarioSchema,"usuarios");

export {UsuarioModel};