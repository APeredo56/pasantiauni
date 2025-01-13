<?php

namespace App\Http\Controllers;

use App\Constants\ModuloIDConstants;
use App\Models\Departamento;
use App\Models\Modulo;
use Illuminate\Http\Request;

class ModuloController extends Controller
{
    public function index()
    {
        return Modulo::with('departamentos')->get();
    }

    public function getDepartamentoPostgrado()
    {
        $modulo = Modulo::find(ModuloIDConstants::POSTGRADO);
        $departamento = $modulo->departamentos->first();
        $departamento->load('contactos');

        $departamento->contactos->each(function ($contacto) {
            $contacto->cargo = $contacto->pivot->cargo;
        });

        return $departamento;
    }

    public function getDepartamentoPregrado()
    {
        $modulo = Modulo::find(ModuloIDConstants::PREGRADO);
        $departamento = $modulo->departamentos->first();
        $departamento->load('contactos');

        $departamento->contactos->each(function ($contacto) {
            $contacto->cargo = $contacto->pivot->cargo;
        });

        return $departamento;
    }

    public function getDepartamentoIdiomas()
    {
        $modulo = Modulo::find(ModuloIDConstants::IDIOMAS);
        $departamento = $modulo->departamentos->first();
        $departamento->load('contactos');

        $departamento->contactos->each(function ($contacto) {
            $contacto->cargo = $contacto->pivot->cargo;
        });

        return $departamento;
    }

    public function getDepartamentoCoordinadoresPregrado()
    {
        $modulo = Modulo::find(ModuloIDConstants::COORDINADORES_PREGRADO);
        $departamento = $modulo->departamentos->first();
        $departamento->load('contactos');

        $departamento->contactos->each(function ($contacto) {
            $contacto->cargo = $contacto->pivot->cargo;
        });

        return $departamento;
    }

    public function getDepartamentoRevista()
    {
        $modulo = Modulo::find(ModuloIDConstants::REVISTA_ESTUDIANTIL);
        $departamento = $modulo->departamentos->first();
        $departamento->load('contactos');

        $departamento->contactos->each(function ($contacto) {
            $contacto->cargo = $contacto->pivot->cargo;
        });

        return $departamento;
    }

    public function asignarDepartamento(Modulo $modulo, Departamento $departamento)
    {
        $modulo->departamentos()->sync($departamento);
        return $modulo->load('departamentos');
    }
}
