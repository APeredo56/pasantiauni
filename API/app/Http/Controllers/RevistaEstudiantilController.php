<?php

namespace App\Http\Controllers;

use App\Models\RevistaEstudiantil;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Laravel\Facades\Image;

class RevistaEstudiantilController extends Controller
{
    public function getReglas(): array
    {
        return [
            'titulo' => 'required|string',
            'introduccion' => 'required|string',
            'subtitulo' => 'required|string',
            'descripcion' => 'required|string',
        ];
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return RevistaEstudiantil::all()->sortByDesc('created_at');
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
        return RevistaEstudiantil::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(RevistaEstudiantil $revistaEstudiantil)
    {
        return $revistaEstudiantil;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RevistaEstudiantil $revistaEstudiantil)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, RevistaEstudiantil $revistaEstudiantil)
    {
        $validador = Validator::make($request->all(), $this->getReglas());
        if ($validador->fails()) {
            return response()->json($validador->messages(), 422);
        }
        $revistaEstudiantil->update($request->all());
        return $revistaEstudiantil;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RevistaEstudiantil $revistaEstudiantil)
    {
        if ($revistaEstudiantil->icono_url && file_exists(public_path($revistaEstudiantil->icono_url))) {
            unlink($revistaEstudiantil->icono_url);
        }

        if ($revistaEstudiantil->pdf_url && file_exists(public_path($revistaEstudiantil->pdf_url))) {
            unlink($revistaEstudiantil->pdf_url);
        }

        $revistaEstudiantil->delete();
        return response()->json(null, 204);
    }

    public function guardarImagen(Request $request, RevistaEstudiantil $revistaEstudiantil)
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

        $directorio = public_path('uploads/revistas/imagenes/');
        if (!File::exists($directorio)) {
            File::makeDirectory($directorio, 0755, true);
        }

        $url = 'uploads/revistas/imagenes/' . $revistaEstudiantil->id . '.webp';
        $imagenWebp->save($url);
        $revistaEstudiantil->icono_url = $url;
        $revistaEstudiantil->save();

        return response()->json(['message' => 'Imagen guardada']);
    }

    public function guardarPdf(Request $request, RevistaEstudiantil $revistaEstudiantil)
    {
        $reglas = [
            'pdf' => 'required|file|mimes:pdf|max:4096',
        ];
        $validador = Validator::make($request->all(), $reglas);
        if ($validador->fails()) {
            return response()->json($validador->messages(), 422);
        }

        $pdf = $request->file('pdf');

        $directorio = public_path('uploads/revistas/pdfs/');
        if (!File::exists($directorio)) {
            File::makeDirectory($directorio, 0755, true);
        }

        $url = 'uploads/revistas/pdfs/' . $revistaEstudiantil->id . '.pdf';
        $pdf->move($directorio, $revistaEstudiantil->id . '.pdf');
        $revistaEstudiantil->pdf_url = $url;
        $revistaEstudiantil->save();

        return response()->json(['message' => 'PDF guardado']);
    }

    public function guardarAutores(Request $request, RevistaEstudiantil $revistaEstudiantil)
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

        $directorio = public_path('uploads/revistas/autores/');
        if (!File::exists($directorio)) {
            File::makeDirectory($directorio, 0755, true);
        }

        $url = 'uploads/revistas/autores/' . $revistaEstudiantil->id . '.webp';
        $imagenWebp->save($url);
        $revistaEstudiantil->autores_url = $url;
        $revistaEstudiantil->save();

        return response()->json(['message' => 'Imagen guardada']);
    }
}
