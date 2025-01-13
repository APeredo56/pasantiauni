<?php

namespace App\Http\Controllers;

use App\Enums\TipoNoticia;
use App\Models\ContenidoNoticia;
use App\Models\Noticia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Enum;
use Intervention\Image\Laravel\Facades\Image;

class NoticiaController extends Controller
{
    public function getReglas(): array
    {
        return [
            'tipo' => ['required', new Enum(TipoNoticia::class)],
            'titulo' => 'required|string',
            'descripcion' => 'required|string',
            'enlace_url' => 'nullable|string',
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Noticia::orderBy('created_at', 'desc')->paginate(12);
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
        $request['icono_url'] = "";
        return Noticia::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(Noticia $noticia)
    {
        return Noticia::with('contenidos')->find($noticia->id);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Noticia $noticia)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Noticia $noticia)
    {
        $validador = Validator::make($request->all(), $this->getReglas());
        if ($validador->fails()) {
            return response()->json($validador->messages(), 422);
        }

        $noticia->update($request->all());
        return $noticia;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Noticia $noticia)
    {
        $directorio = public_path('uploads/noticias/' . $noticia->id);

        if (File::exists($directorio)) {
            File::deleteDirectory($directorio);
        }
        $noticia->delete();
        return response()->json(['message' => 'Noticia eliminada']);
    }

    public function getUltimasNoticias()
    {
        return Noticia::orderBy('created_at', 'desc')->take(5)->get();
    }

    public function buscar(string $termino)
    {

        $noticias = Noticia::where('titulo', 'LIKE', "%{$termino}%")->orderBy('created_at', 'desc')->paginate(12);

        return response()->json($noticias);
    }

    public function guardarImagen(Request $request, Noticia $noticia)
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

        $path = 'uploads/noticias/' . $noticia->id . "/";

        $directorio = public_path($path);
        if (!File::exists($directorio)) {
            File::makeDirectory($directorio, 0755, true);
        }

        $url = $path . 'imagen-' .$noticia->id . '.webp';
        $imagenWebp->save($url);
        $noticia->icono_url  = $url;
        $noticia->save();

        return response()->json(['message' => 'Imagen guardada']);
    }
}
