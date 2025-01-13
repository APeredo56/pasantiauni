<?php

namespace App\Http\Controllers;

use App\Models\Curso;
use App\Models\Diplomado;
use Illuminate\Http\Request;

class DiplomadoController extends Controller
{
    private function getReglas(): array
    {
        return [
            'publico_objetivo' => 'required|string',
        ];
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Curso::with(['diplomado'])->whereHas('diplomado')->get();
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
        $validador = CursoController::crearValidador($request, $this->getReglas());
        if ($validador->fails()) {
            return response()->json($validador->messages(), 422);
        }
        $curso = Curso::create($request->all());
        $request['curso_id'] = $curso->id;
        $request['slug'] = $curso->slug;

        $diplomado = Diplomado::create($request->all());
        return Curso::with('diplomado')->find($diplomado->curso_id);
    }

    /**
     * Display the specified resource.
     */
    public function show(Diplomado $diplomado)
    {
        $curso = Curso::with(['diplomado', 'contactos'])->find($diplomado->curso_id);

        $contactosSinPivot = $curso->contactos->map(function ($contacto) {
            return [
                'id' => $contacto->id,
                'nombre' => $contacto->nombre,
                'correo' => $contacto->correo,
                'celular' => $contacto->celular,
                'fijo' => $contacto->fijo,
                'cargo' => $contacto->pivot->cargo,
            ];
        });
        $curso->setRelation('contactos', $contactosSinPivot);

        return $curso;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Diplomado $diplomado)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Diplomado $diplomado)
    {
        $validador = CursoController::crearValidador($request, $this->getReglas());
        if ($validador->fails()) {
            return response()->json($validador->messages(), 422);
        }

        $curso = Curso::find($diplomado->curso_id);
        $curso->update($request->all());
        $request['slug'] = $curso->slug;

        $diplomado->update($request->all());
        return Curso::with('diplomado')->find($diplomado->curso_id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Diplomado $diplomado)
    {
        $curso = Curso::find($diplomado->curso_id);

        if ($curso->imagen_url && file_exists(public_path($curso->imagen_url))) {
            unlink($curso->imagen_url);
        }

        $diplomado->delete();
        $curso->delete();
        return response()->json(['mensaje' => 'Diplomado eliminado']);
    }
}
