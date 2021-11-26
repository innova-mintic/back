import { gql } from 'apollo-server-express';
import { tiposUsuario } from '../models/usuario/tipos.js';
import { tiposProyecto } from '../models/proyecto/tipos.js';
import { tiposAvance } from '../models/avances/tipos.js';
import { tiposEnums } from '../models/enums/tipos.js';
import { tiposInscripcion } from '../models/inscripcion/tipos.js';

const tiposGlobales= gql`

    scalar Date

`;

export const tipos=[tiposGlobales, tiposUsuario, tiposProyecto,tiposAvance, tiposEnums,tiposInscripcion]