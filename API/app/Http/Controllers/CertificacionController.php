<?php

namespace App\Http\Controllers;

use App\Enums\TipoCertificacion;
use App\Models\Certificacion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;

class CertificacionController extends Controller
{
    public function getReglas(): array
    {
        return [
            'tipo' => ['required', new Enum(TipoCertificacion::class)],
            'titulo' => 'required|string',
            'carrera_id' => 'required|integer',
        ];
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Certificacion::all();
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
            return response()->json($validador->messages(), 422);
        }
        return Certificacion::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(Certificacion $certificacion)
    {
        return $certificacion;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Certificacion $certificacion)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Certificacion $certificacion)
    {
        $validador = Validator::make($request->all(), $this->getReglas());
        if ($validador->fails()) {
            return response()->json($validador->messages(), 422);
        }
        $certificacion->update($request->all());
        return $certificacion;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Certificacion $certificacion)
    {
        $certificacion->delete();
        return response()->json(['message' => 'Certificacion eliminada correctamente']);
    }
}
