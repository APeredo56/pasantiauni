<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Noticia extends Model
{
    use HasFactory, HasSlug;

    protected $fillable = [
        'tipo',
        'titulo',
        'descripcion',
        'icono_url',
        'enlace_url',
    ];

    public function contenidos()
    {
        return $this->hasMany(ContenidoNoticia::class);
    }

    public function getSlugOptions() : SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('titulo')
            ->saveSlugsTo('slug');
    }

    /**
     * Get the route key for the model.
     *
     * @return string
     */
    public function getRouteKeyName()
    {
        return 'slug';
    }
}
