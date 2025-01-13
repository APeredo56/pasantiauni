<?php

namespace App\Http\Controllers;

use App\Models\Materia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MateriaController extends Controller
{
    public function getReglas(): array
    {
        return [
            'nombre' => 'required|string'
        ];
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Materia::all();
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
        return Materia::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(Materia $materia)
    {
        return $materia;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Materia $materia)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Materia $materia)
    {
        $validador = Validator::make($request->all(), $this->getReglas());
        if ($validador->fails()) {
            return response()->json($validador->messages(), 422);
        }
        $materia->update($request->all());
        return $materia;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Materia $materia)
    {
        $materia->delete();
        return response()->json(['mensaje' => 'Materia eliminada']);
    }
}
