<?php

namespace App\Http\Controllers;

use App\Models\Departamento;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DepartamentoController extends Controller
{
    public function getReglas() : array
    {
        return [
            'nombre' => 'required|string',
        ];
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $departamentos = Departamento::with('contactos')->get();

        $departamentos->each(function ($departamento) {
            $departamento->contactos->each(function ($contacto) {
                $contacto->cargo = $contacto->pivot->cargo;
            });
        });

        return $departamentos;
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

        return Departamento::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(Departamento $departamento)
    {
        return $departamento;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Departamento $departamento)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Departamento $departamento)
    {
        $validador = Validator::make($request->all(), $this->getReglas());
        if ($validador->fails()) {
            return response()->json($validador->errors(), 422);
        }

        $departamento->update($request->all());
        return $departamento;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Departamento $departamento)
    {
        $departamento->delete();
        return response()->json(['success' => true]);
    }
}
