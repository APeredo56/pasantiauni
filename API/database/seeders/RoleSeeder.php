<?php

namespace Database\Seeders;

use App\Enums\RolesUsuario;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $rolSuperusuario     = Role::create(['name' => RolesUsuario::SUPERUSUARIO]);
        $rolAdminUsuarios     = Role::create(['name' => RolesUsuario::ADMIN_USUARIOS]);
        $rolAdminPregrado     = Role::create(['name' => RolesUsuario::ADMIN_PREGRADO]);
        $rolAdminPostgrado     = Role::create(['name' => RolesUsuario::ADMIN_POSTGRADO]);
        $rolAdminNoticias     = Role::create(['name' => RolesUsuario::ADMIN_NOTICIAS]);
        $rolAdminContactos     = Role::create(['name' => RolesUsuario::ADMIN_CONTACTOS]);
        $rolAdminRevista     = Role::create(['name' => RolesUsuario::ADMIN_REVISTAS]);

        $insertarUsuario = Permission::create(['name' => 'insertar usuarios']);
        $verUsuario = Permission::create(['name' => 'ver usuarios']);
        $eliminarUsuario = Permission::create(['name' => 'eliminar usuarios']);
        $editarUsuario = Permission::create(['name' => 'editar usuarios']);

        $insertarCurso = Permission::create(['name' => 'insertar cursos']);
        $eliminarCurso = Permission::create(['name' => 'eliminar cursos']);
        $editarCurso = Permission::create(['name' => 'editar cursos']);

        $insertarCarrera = Permission::create(['name' => 'insertar carreras']);
        $eliminarCarrera = Permission::create(['name' => 'eliminar carreras']);
        $editarCarrera = Permission::create(['name' => 'editar carreras']);

        $insertarMaestria = Permission::create(['name' => 'insertar maestrias']);
        $eliminarMaestria = Permission::create(['name' => 'eliminar maestrias']);
        $editarMaestria = Permission::create(['name' => 'editar maestrias']);

        $insertarDiplomado = Permission::create(['name' => 'insertar diplomados']);
        $eliminarDiplomado = Permission::create(['name' => 'eliminar diplomados']);
        $editarDiplomado = Permission::create(['name' => 'editar diplomados']);

        $insertarMateria = Permission::create(['name' => 'insertar materias']);
        $eliminarMateria = Permission::create(['name' => 'eliminar materias']);
        $editarMateria = Permission::create(['name' => 'editar materias']);

        $insertarDepartamento = Permission::create(['name' => 'insertar departamentos']);
        $eliminarDepartamento = Permission::create(['name' => 'eliminar departamentos']);
        $editarDepartamento = Permission::create(['name' => 'editar departamentos']);

        $insertarContacto = Permission::create(['name' => 'insertar contactos']);
        $eliminarContacto = Permission::create(['name' => 'eliminar contactos']);
        $editarContacto = Permission::create(['name' => 'editar contactos']);
        $asignarContacto = Permission::create(['name' => 'asignar contactos']);

        $insertarCertificacion = Permission::create(['name' => 'insertar certificacion']);
        $eliminarCertificacion = Permission::create(['name' => 'eliminar certificacion']);
        $editarCertificacion = Permission::create(['name' => 'editar certificacion']);

        $insertarNoticia = Permission::create(['name' => 'insertar noticia']);
        $eliminarNoticia = Permission::create(['name' => 'eliminar noticia']);
        $editarNoticia = Permission::create(['name' => 'editar noticia']);

        $rolAdminUsuarios->syncPermissions([
            $insertarUsuario,
            $verUsuario,
            $eliminarUsuario,
            $editarUsuario
        ]);

        $rolAdminPregrado->syncPermissions([
            $insertarCurso,
            $eliminarCurso,
            $editarCurso,
            $insertarCarrera,
            $eliminarCarrera,
            $editarCarrera,
            $insertarMateria,
            $eliminarMateria,
            $editarMateria,
            $insertarCertificacion,
            $eliminarCertificacion,
            $editarCertificacion,
            $asignarContacto
        ]);

        $rolAdminPostgrado->syncPermissions([
            $insertarCurso,
            $eliminarCurso,
            $editarCurso,
            $insertarMaestria,
            $eliminarMaestria,
            $editarMaestria,
            $insertarDiplomado,
            $eliminarDiplomado,
            $editarDiplomado,
            $insertarMateria,
            $eliminarMateria,
            $editarMateria,
            $asignarContacto
        ]);

        $rolAdminContactos->syncPermissions([
            $insertarContacto,
            $eliminarContacto,
            $editarContacto,
            $asignarContacto,
            $insertarDepartamento,
            $eliminarDepartamento,
            $editarDepartamento
        ]);

        $rolAdminNoticias->syncPermissions([
            $insertarNoticia,
            $eliminarNoticia,
            $editarNoticia
        ]);

        $superAdmin = User::create([
            'name' => 'Super Admin',
            'email' => 'superadmin@example.com',
            'password' => bcrypt('password'),
        ]);

        $superAdmin->assignRole('superusuario');

        $adminUsuarios = User::create([
            'name' => 'Normal User',
            'email' => 'admin@example.com',
            'password' => bcrypt('password')
        ]);

        $adminUsuarios->assignRole('adminusuarios');

    }
}
