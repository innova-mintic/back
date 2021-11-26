import { resolversProyecto } from "../models/proyecto/resolvers.js";
import { resolversUsuario } from "../models/usuario/resolvers.js";
import { resolversAvances } from "../models/avances/resolvers.js";
import { resolversInscripcion } from "../models/inscripcion/resolvers.js";

export const resolvers =[resolversUsuario, resolversProyecto,resolversAvances,resolversInscripcion]