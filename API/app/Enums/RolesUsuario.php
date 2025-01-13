<?php

namespace App\Enums;

enum RolesUsuario: string
{
    case SUPERUSUARIO = 'superusuario';
    case ADMIN_USUARIOS = 'adminusuarios';
    case ADMIN_PREGRADO = 'adminpregrado';
    case ADMIN_POSTGRADO = 'adminpostgrado';
    case ADMIN_NOTICIAS = 'adminnoticias';
    case ADMIN_CONTACTOS = 'admincontactos';
    case ADMIN_REVISTAS = 'adminrevistas';
}
