<?php

namespace App\Http\Controllers;

use App\Models\Curso;
use App\Models\Carrera;
use Illuminate\Http\Request;

class CarreraController extends Controller
{

    private function getReglas(): array
    {
        return [
            'introduccion' => 'required|string',
            'caracteristicas' => 'required|string',
            'perfil_profesional' => 'required|string',
            'campo_laboral' => 'required|string',
            'porque_estudiar' => 'required|string',
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Curso::with(['carrera'])->whereHas('carrera')->get();
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

        $carrera = Carrera::create($request->all());
        return Curso::with('carrera')->find($carrera->curso_id);
    }

    /**
     * Display the specified resource.
     */
    public function show(Carrera $carrera)
    {
        $curso = Curso::with(['carrera.certificaciones', 'contactos'])->find($carrera->curso_id);

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
    public function edit(Carrera $carrera)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Carrera $carrera)
    {
        $validador = CursoController::crearValidador($request, $this->getReglas());
        if ($validador->fails()) {
            return response()->json($validador->messages(), 422);
        }

        $curso = Curso::find($carrera->curso_id);
        $curso->update($request->all());
        $request['slug'] = $curso->slug;

        $carrera->update($request->all());
        return Curso::with('carrera')->find($carrera->curso_id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Carrera $carrera)
    {
        $curso = Curso::find($carrera->curso_id);

        if ($curso->imagen_url && file_exists(public_path($curso->imagen_url))) {
            unlink($curso->imagen_url);
        }

        $carrera->delete();
        $curso->delete();
        return response()->json(['mensaje' => 'Carrera eliminada']);
    }
}
