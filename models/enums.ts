
enum Enum_Rol{
    estudiante="Estudiante",
    lider="Lider",
    administrador="Administrador"  
}

enum Enum_EstadoUsuario{
    pendiente="Pendiente",
    autorizado="Autorizado",
    no_autorizado="No Autorizado"  
}

enum Enum_EstadoProyecto{
    activo="Activo",
    inactivo="Inactivo",
}

enum Enum_FaseProyecto{
    iniciado="Inciado",
    desarrollo="En desarrollo",
    terminado="Terminado"  ,
    nula=""
}

export {Enum_Rol,Enum_EstadoUsuario, Enum_FaseProyecto,Enum_EstadoProyecto};