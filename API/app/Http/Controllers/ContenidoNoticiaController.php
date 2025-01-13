<?php

namespace App\Http\Controllers;

use App\Enums\TipoContenido;
use App\Models\ContenidoLista;
use App\Models\ContenidoNoticia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Enum;
use Intervention\Image\Laravel\Facades\Image;

class ContenidoNoticiaController extends Controller
{
    public function getReglasContenido(): array
    {
        return [
            'tipo' => ['required', new Enum(TipoContenido::class)],
            'contenido' => 'nullable|string',
            'imagen' => 'nullable|image|max:4096',
            'noticia_id' => 'required|integer|exists:noticias,id',
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validador = Validator::make($request->all(), $this->getReglasContenido());
        if ($validador->fails()) {
            return response()->json($validador->messages(), 422);
        }
        return ContenidoNoticia::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(ContenidoNoticia $contenidoNoticia)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ContenidoNoticia $contenidoNoticia)
    {

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ContenidoNoticia $contenidoNoticia)
    {
        $validador = Validator::make($request->all(), $this->getReglasContenido());
        if ($validador->fails()) {
            return response()->json($validador->messages(), 422);
        }
        $contenidoNoticia->update($request->all());
        return $contenidoNoticia;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ContenidoNoticia $contenidoNoticia)
    {
        if ($contenidoNoticia->tipo == TipoContenido::IMAGEN->value) {
            $path = public_path($contenidoNoticia->contenido);
            if (File::exists($path)) {
                File::delete($path);
            }
        }
        $contenidoNoticia->delete();
        return response()->json(['message' => 'Contenido eliminado']);
    }

    public function guardarImagen(Request $request, ContenidoNoticia $contenidoNoticia)
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

        $path = 'uploads/noticias/' . $contenidoNoticia->noticia_id . "/";

        $directorio = public_path($path);
        if (!File::exists($directorio)) {
            File::makeDirectory($directorio, 0755, true);
        }

        $url = $path . $contenidoNoticia->id . '.webp';
        $imagenWebp->save($url);
        $contenidoNoticia->contenido  = $url;
        $contenidoNoticia->save();

        return response()->json(['message' => 'Imagen guardada']);
    }
}
