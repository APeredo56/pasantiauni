import { RoleEnum } from "../models/enums/RoleEnum";

export const hasPermission = (requiredRoles: RoleEnum[], roles: Set<RoleEnum>) => {
    return requiredRoles.some(role => roles.has(role));
};

export const pagePermissions = {
    Maestrias: [RoleEnum.SUPERUSUARIO, RoleEnum.ADMIN_POSTGRADO],
    Diplomados: [RoleEnum.SUPERUSUARIO, RoleEnum.ADMIN_POSTGRADO],
    Carreras: [RoleEnum.SUPERUSUARIO, RoleEnum.ADMIN_PREGRADO],
    Materias: [RoleEnum.SUPERUSUARIO, RoleEnum.ADMIN_POSTGRADO, RoleEnum.ADMIN_PREGRADO],
    Certificaciones: [RoleEnum.SUPERUSUARIO, RoleEnum.ADMIN_PREGRADO],
    Contactos: [RoleEnum.SUPERUSUARIO, RoleEnum.ADMIN_CONTACTOS],
    Departamentos: [RoleEnum.SUPERUSUARIO, RoleEnum.ADMIN_CONTACTOS],
    Modulos: [RoleEnum.SUPERUSUARIO, RoleEnum.ADMIN_CONTACTOS],
    Usuarios: [RoleEnum.SUPERUSUARIO, RoleEnum.ADMIN_USUARIOS],
    Noticias: [RoleEnum.SUPERUSUARIO, RoleEnum.ADMIN_NOTICIAS],
    Revistas: [RoleEnum.SUPERUSUARIO, RoleEnum.ADMIN_REVISTAS],
};


