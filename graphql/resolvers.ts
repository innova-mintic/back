import { resolversProyecto } from "../models/proyecto/resolvers";
import { resolversUsuario } from "../models/usuario/resolvers";
import { resolversAvances } from "../models/avances/resolvers";

export const resolvers =[resolversUsuario, resolversProyecto,resolversAvances]