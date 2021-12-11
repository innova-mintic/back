import { gql } from 'apollo-server-express';

const tiposProyecto= gql`

    scalar Date
    

    type Objetivo{
        _id:ID!
        descripcion:String!, 
        tipo:Enum_TipoObjetivo!
    }

    input crearObjetivo{
        descripcion:String!, 
        tipo:Enum_TipoObjetivo!       
    }

    type Proyecto{
        _id:ID!
        nombre:String!
        presupuesto:String!
        fechaInicio:Date!
        fechaFin:Date
        estado: Enum_EstadoProyecto!
        fase: Enum_FaseProyecto!
        lider:Usuario!
        objetivos:[Objetivo]
        avances:[Avance]
        inscripciones:[Inscripcion]
    }

    type Query{
        Proyectos:[Proyecto]
        Proyecto(_id:String!):Proyecto
        FiltrarProyectoPorLider(_id:String!):[Proyecto]      
    }

    type Mutation{
        crearProyecto(
            nombre:String!
            presupuesto:String!
            fechaInicio:Date!
            fechaFin:Date
            estado: Enum_EstadoProyecto
            fase: Enum_FaseProyecto
            lider:String!
            objetivos:[crearObjetivo]
        ):Proyecto
        
        aprobarProyecto(
            _id:String!,
            estado: Enum_EstadoProyecto!
            fase: Enum_FaseProyecto!
        ):Proyecto

        editarProyecto(
            _id:String!,
            nombre: String!
            presupuesto:String!
        ):Proyecto

        crearObjetivo(idProyecto:String!, descripcion:String!,tipo:Enum_TipoObjetivo!):Proyecto

        editarObjetivo(idProyecto:String!,indexObjetivo:Int!,descripcion:String!,tipo:Enum_TipoObjetivo!):Proyecto

        eliminarObjetivo(idProyecto:String!,idObjetivo:String!):Proyecto

    }
`;

export {tiposProyecto};