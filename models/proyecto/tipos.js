import { gql } from 'apollo-server-express';

const tiposProyecto= gql`

    scalar Date
    

    type Objetivo{
        _id:ID!
        descripcion:String!, 
    }

    input crearObjetivo{
        descripcion:String!,     
    }

    input camposObjetivo {
        descripcion: String!
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
        objetivoGeneral: String!
        objetivosEspecificos:[Objetivo!]
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
            objetivoGeneral: String!
            objetivosEspecificos:[crearObjetivo]!
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
            objetivoGeneral: String!
        ):Proyecto

        crearObjetivo(idProyecto:String!, campos:camposObjetivo!):Proyecto

        editarObjetivo(idProyecto:String!,indexObjetivo:Int!,descripcion:String!):Proyecto

        eliminarObjetivo(idProyecto:String!,idObjetivo:String!):Proyecto

    }
`;

export {tiposProyecto};