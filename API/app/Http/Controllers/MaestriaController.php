<?php

namespace App\Http\Controllers;

use App\Models\Curso;
use App\Models\Maestria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MaestriaController extends Controller
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
        return Curso::with(['maestria'])->whereHas('maestria')->get();
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

        $maestria = Maestria::create($request->all());
        return Curso::with('maestria')->find($maestria->curso_id);
    }

    /**
     * Display the specified resource.
     */
    public function show(Maestria $maestria)
    {
        $curso = Curso::with(['maestria', 'contactos'])->find($maestria->curso_id);

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
    public function edit(Maestria $maestria)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Maestria $maestria)
    {
        $validador = CursoController::crearValidador($request, $this->getReglas());
        if ($validador->fails()) {
            return response()->json($validador->messages(), 422);
        }

        $curso = Curso::find($maestria->curso_id);
        $curso->update($request->all());
        $request['slug'] = $curso->slug;

        $maestria->update($request->all());
        return Curso::with('maestria')->find($maestria->curso_id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Maestria $maestria)
    {
        $curso = Curso::find($maestria->curso_id);

        if ($curso->imagen_url && file_exists(public_path($curso->imagen_url))) {
            unlink($curso->imagen_url);
        }

        $maestria->delete();
        $curso->delete();
        return response()->json(['mensaje' => 'Maestria eliminada']);
    }
}
