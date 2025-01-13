<?php

namespace App\Http\Controllers;

use App\Models\Contacto;
use App\Models\Departamento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContactoController extends Controller
{
    public function getReglas() : array
    {
        return [
            'nombre' => 'required|string',
            'correo' => 'required|email',
            'celular' => 'required|string',
            'fijo' => 'required|string',
        ];
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Contacto::all();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validador = Validator::make($request->all(), $this->getReglas());
        if ($validador->fails()) {
            return response()->json($validador->errors(), 422);
        }

        return Contacto::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(Contacto $contacto)
    {
        $contacto->load('departamentos');
        $departamentosSinPivot = $contacto->departamentos->map(function ($departamento) {
            return [
                'id' => $departamento->id,
                'nombre' => $departamento->nombre,
                'cargo' => $departamento->pivot->cargo,
            ];
        });
        $contacto->setRelation('departamentos', $departamentosSinPivot);
        return $contacto;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Contacto $contacto)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Contacto $contacto)
    {
        $validador = Validator::make($request->all(), $this->getReglas());
        if ($validador->fails()) {
            return response()->json($validador->errors(), 422);
        }

        $contacto->update($request->all());
        return $contacto;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contacto $contacto)
    {
        $contacto->delete();
        return response()->json(['mensaje' => 'Carrera eliminada']);
    }

    public function asignarDepartamento(Contacto $contacto, Departamento $departamento)
    {
        $reglas = [
            'cargo' => 'required|string',
        ];
        $validador = Validator::make(request()->all(), $reglas);
        if ($validador->fails()) {
            return response()->json($validador->messages(), 422);
        }
        $contacto->departamentos()->attach($departamento, ['cargo' => request('cargo')]);
        return response()->json(['message' => 'Departamento asignado']);
    }

    public function desasignarDepartamento(Contacto $contacto, Departamento $departamento)
    {
        $contacto->departamentos()->detach($departamento);
        return response()->json(['message' => 'Departamento desasignado']);
    }
}
