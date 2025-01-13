<?php

namespace routes;

use App\Enums\RolesUsuario;
use App\Http\Controllers\CertificacionController;
use App\Http\Controllers\ContactoController;
use App\Http\Controllers\ContenidoNoticiaController;
use App\Http\Controllers\CursoController;
use App\Http\Controllers\CarreraController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DepartamentoController;
use App\Http\Controllers\DiplomadoController;
use App\Http\Controllers\MaestriaController;
use App\Http\Controllers\MateriaController;
use App\Http\Controllers\ModuloController;
use App\Http\Controllers\NoticiaController;
use App\Http\Controllers\RevistaEstudiantilController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/me', function (Request $request) {
    return $request->user()->load('roles');
})->middleware('auth:sanctum');

Route::group(["middleware" => "auth:sanctum"], function () {
    //Rutas para los administradores de pregrado
    Route::group(["middleware" => "role_or_permission:" . RolesUsuario::ADMIN_PREGRADO->value], function () {
        Route::post('/carreras', [CarreraController::class, 'store']);
        Route::put('/carreras/{carrera}', [CarreraController::class, 'update']);
        Route::delete('/carreras/{carrera}', [CarreraController::class, 'destroy']);

        Route::get('/certificaciones', [CertificacionController::class, 'show']);
        Route::get('/certificaciones/{certificacion}', [CertificacionController::class, 'show']);
        Route::post('/certificaciones', [CertificacionController::class, 'store']);
        Route::put('/certificaciones/{certificacion}', [CertificacionController::class, 'update']);
        Route::delete('/certificaciones/{certificacion}', [CertificacionController::class, 'destroy']);
    });

    //Rutas para los administradores de postgrado
    Route::group(["middleware" => "role_or_permission:" . RolesUsuario::ADMIN_POSTGRADO->value], function () {
        Route::post('/maestrias', [MaestriaController::class, 'store']);
        Route::put('/maestrias/{maestria}', [MaestriaController::class, 'update']);
        Route::delete('/maestrias/{maestria}', [MaestriaController::class, 'destroy']);

        Route::post('/diplomados', [DiplomadoController::class, 'store']);
        Route::put('/diplomados/{diplomado}', [DiplomadoController::class, 'update']);
        Route::delete('/diplomados/{diplomado}', [DiplomadoController::class, 'destroy']);
    });

    //Ruta para cambiar la imagen de los cursos
    Route::middleware("can:editar cursos")->post('/cursos/{curso}/imagen', [CursoController::class, 'guardarImagen']);

    //Rutas para materias
    Route::middleware("can:editar materias")->get('/materias', [MateriaController::class, 'index']);
    Route::middleware("can:editar materias")->get('/materias/{materia}', [MateriaController::class, 'show']);
    Route::middleware("can:insertar materias")->post('/materias', [MateriaController::class, 'store']);
    Route::middleware("can:editar materias")->put('/materias/{materia}', [MateriaController::class, 'update']);
    Route::middleware("can:eliminar materias")->delete('/materias/{materia}', [MateriaController::class, 'destroy']);
    Route::middleware("can:editar materias")->post('/cursos/{curso}/materias', [CursoController::class, 'asignarMaterias']);

    //Rutas para administradores de contactos
    Route::group(["middleware" => "role_or_permission:" . RolesUsuario::ADMIN_CONTACTOS->value], function () {
        Route::post('/contactos', [ContactoController::class, 'store']);
        Route::put('/contactos/{contacto}', [ContactoController::class, 'update']);
        Route::delete('/contactos/{contacto}', [ContactoController::class, 'destroy']);

        Route::post('/departamentos', [DepartamentoController::class, 'store']);
        Route::put('/departamentos/{departamento}', [DepartamentoController::class, 'update']);
        Route::delete('/departamentos/{departamento}', [DepartamentoController::class, 'destroy']);

        Route::post('/contactos/{contacto}/departamentos/{departamento}', [ContactoController::class, 'asignarDepartamento']);
        Route::delete('/contactos/{contacto}/departamentos/{departamento}', [ContactoController::class, 'desasignarDepartamento']);

        Route::get('/modulos', [ModuloController::class, 'index']);
        Route::post('/modulos/{modulo}/departamentos/{departamento}', [ModuloController::class, 'asignarDepartamento']);
    });

    //Ruta para asignar contactos a cursos
    Route::group(["middleware" => "can:asignar contactos"], function () {
        Route::post('/cursos/{curso}/contactos/{contacto}', [CursoController::class, 'asignarContacto']);
        Route::delete('/cursos/{curso}/contactos/{contacto}', [CursoController::class, 'desasignarContacto']);
    });

    //Ruta para asignar contactos a departamentos
    Route::group(["middleware" => "can:editar contactos"], function () {
        Route::post('/contactos/{contacto}/departamentos/{departamento}', [ContactoController::class, 'asignarDepartamento']);
        Route::delete('/contactos/{contacto}/departamentos/{departamento}', [ContactoController::class, 'desasignarDepartamento']);
    });

    //Rutas para administradores de usuarios
    Route::group(["middleware" => "role_or_permission:" . RolesUsuario::ADMIN_USUARIOS->value], function () {
        Route::get('/usuarios', [UserController::class, 'index']);
        Route::get('/usuarios/{usuario}', [UserController::class, 'show']);
        Route::post('/usuarios', [UserController::class, 'store']);
        Route::put('/usuarios/{usuario}', [UserController::class, 'update']);
        Route::delete('/usuarios/{usuario}', [UserController::class, 'destroy']);
        Route::post('/usuarios/{usuario}/roles', [UserController::class, 'asignarRoles']);
    });

    //Rutas para administradores de noticias
    Route::group(["middleware" => "role_or_permission:" . RolesUsuario::ADMIN_NOTICIAS->value], function () {
        Route::post('/noticias', [NoticiaController::class, 'store']);
        Route::put('/noticias/{noticia}', [NoticiaController::class, 'update']);
        Route::delete('/noticias/{noticia}', [NoticiaController::class, 'destroy']);
        Route::post('/noticias/contenido', [ContenidoNoticiaController::class, 'store']);
        Route::post('/noticias/contenido/{contenidoNoticia}/imagen', [ContenidoNoticiaController::class, 'guardarImagen']);
        Route::put('/noticias/contenido/{contenidoNoticia}', [ContenidoNoticiaController::class, 'update']);
        Route::delete('/noticias/contenido/{contenidoNoticia}', [ContenidoNoticiaController::class, 'destroy']);
        Route::post('/noticias/{noticia}/imagen', [NoticiaController::class, 'guardarImagen']);
    });

    //Rutas para administradores de revista
    Route::group(["middleware" => "role_or_permission:" . RolesUsuario::ADMIN_REVISTAS->value], function () {
        Route::post('/revista-estudiantil', [RevistaEstudiantilController::class, 'store']);
        Route::put('/revista-estudiantil/{revistaEstudiantil}', [RevistaEstudiantilController::class, 'update']);
        Route::delete('/revista-estudiantil/{revistaEstudiantil}', [RevistaEstudiantilController::class, 'destroy']);
        Route::post('/revista-estudiantil/{revistaEstudiantil}/imagen', [RevistaEstudiantilController::class, 'guardarImagen']);
        Route::post('/revista-estudiantil/{revistaEstudiantil}/pdf', [RevistaEstudiantilController::class, 'guardarPdf']);
        Route::post('/revista-estudiantil/{revistaEstudiantil}/autores', [RevistaEstudiantilController::class, 'guardarAutores']);
    });
});

Route::get('/cursos/{curso}/pensum', [CursoController::class, 'pensum']);
Route::get('/cursos', [CursoController::class, 'index']);
Route::get('/cursos/{curso}', [CursoController::class, 'show']);
Route::get('/carreras', [CarreraController::class, 'index']);
Route::get('/carreras/{carrera}', [CarreraController::class, 'show']);

Route::get('/maestrias', [MaestriaController::class, 'index']);
Route::get('/maestrias/{maestria}', [MaestriaController::class, 'show']);

Route::get('/diplomados', [DiplomadoController::class, 'index']);
Route::get('/diplomados/{diplomado}', [DiplomadoController::class, 'show']);

Route::get('/contactos', [ContactoController::class, 'index']);
Route::get('/contactos/{contacto}', [ContactoController::class, 'show']);

Route::get('/departamentos', [DepartamentoController::class, 'index']);
Route::get('/departamentos/{departamento}', [DepartamentoController::class, 'show']);

Route::get('/noticias', [NoticiaController::class, 'index']);
Route::get('/noticias/{noticia}', [NoticiaController::class, 'show']);
Route::get('/noticias/ultimas', [NoticiaController::class, 'getUltimasNoticias']);
Route::get('/noticias/buscar/{termino}', [NoticiaController::class, 'buscar']);

Route::get('/modulos/postgrado/departamentos', [ModuloController::class, 'getDepartamentoPostgrado']);
Route::get('/modulos/pregrado/departamentos', [ModuloController::class, 'getDepartamentoPregrado']);
Route::get('/modulos/idiomas/departamentos', [ModuloController::class, 'getDepartamentoIdiomas']);
Route::get('/modulos/coordinadores-pregrado/departamentos', [ModuloController::class, 'getDepartamentoCoordinadoresPregrado']);
Route::get('/modulos/revista-estudiantil/departamentos', [ModuloController::class, 'getDepartamentoRevista']);

Route::get('/revista-estudiantil', [RevistaEstudiantilController::class, 'index']);
Route::get('/revista-estudiantil/{revistaEstudiantil}', [RevistaEstudiantilController::class, 'show']);

Route::post('/iniciar-sesion', [AuthController::class, 'login'])->middleware('guest')->name('login');
Route::post('/cerrar-sesion', [AuthController::class, 'logout'])->middleware('auth:sanctum');

