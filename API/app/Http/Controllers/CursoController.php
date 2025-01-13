<?php

namespace App\Http\Controllers;

use App\Enums\AreaCurso;
use App\Models\Contacto;
use App\Models\Curso;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Enum;
use Intervention\Image\Laravel\Facades\Image;

class CursoController extends Controller
{
    public static function getReglas(): array
    {
        return [
            'nombre' => 'required|string',
            'area' => ['required', new Enum(AreaCurso::class)],
            'objetivos' => 'required|string',
            'semestres' => 'required|integer|min:1|max:16',
        ];
    }

    public static function crearValidador(Request $request, array $reglasExtra): \Illuminate\Contracts\Validation\Validator
    {
        return Validator::make($request->all(), array_merge(self::getReglas(), $reglasExtra));
    }

    public function index()
    {
        return Curso::all();
    }

    public function show(Curso $curso)
    {
        $curso->load('contactos');

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

    public function guardarImagen(Request $request, Curso $curso)
    {
        $reglas = [
            'imagen' => 'required|image|max:4096',
        ];
        $validador = Validator::make($request->all(), $reglas);
        if ($validador->fails()) {
            return response()->json($validador->messages(), 422);
        }

        $imagen = $request->file('imagen');
        $imagenWebp = Image::read($imagen)->toWebp(90);

        $directorio = public_path('uploads/cursos');
        if (!File::exists($directorio)) {
            File::makeDirectory($directorio, 0755, true);
        }

        $url = 'uploads/cursos/' . $curso->id . '.webp';
        $imagenWebp->save($url);
        $curso->imagen_url = $url;
        $curso->save();

        return response()->json(['message' => 'Imagen guardada']);
    }

    public function asignarMaterias(Curso $curso)
    {
        $reglas = [
            'materias_id' => 'nullable|array',
            'materias_id.*' => 'integer|exists:materias,id',
            'semestre' => 'required|integer|min:1|max:10',
        ];
        $validador = Validator::make(request()->all(), $reglas);
        if ($validador->fails()) {
            return response()->json($validador->messages(), 422);
        }
        $materiasActuales = $curso->materias()->wherePivot('semestre', request('semestre'))->get();
        $materiasActuales->each(function ($materia) use ($curso) {
            $materia->cursos()->detach($curso->id);
        });

        $curso->materias()->syncWithPivotValues(request('materias_id'), ['semestre' => request('semestre')], false);
        return response()->json(['message' => 'Materias asignadas']);
    }

    public function pensum(Curso $curso)
    {
        $materiasAgrupadas = Curso::with('materias')->find($curso->id)->materias->groupBy('pivot.semestre')->sortKeys();

        $resultado = [];

        foreach ($materiasAgrupadas as $semestre => $materias) {
            $resultado[] = [
                'semestre' => $semestre,
                'materias' => $materias->map(function ($materia) {
                    return [
                        'id' => $materia->id,
                        'nombre' => $materia->nombre,
                    ];
                })->values()->toArray()
            ];
        }

        return $resultado;
    }

    public function asignarContacto(Curso $curso, Contacto $contacto)
    {
        $reglas = [
            'cargo' => 'required|string',
        ];
        $validador = Validator::make(request()->all(), $reglas);
        if ($validador->fails()) {
            return response()->json($validador->messages(), 422);
        }
        $curso->contactos()->syncWithPivotValues($contacto->id, ['cargo' => request('cargo')], false);
        return response()->json(['message' => 'Contacto asignado']);
    }

    public function desasignarContacto(Curso $curso, Contacto $contacto)
    {
        $curso->contactos()->detach($contacto->id);
        return response()->json(['message' => 'Contacto desasignado']);
    }
}
