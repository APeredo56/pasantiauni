<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Carrera extends Model
{
    use HasFactory, HasSlug;

    public $timestamps = false;

    protected $fillable = [
        'introduccion',
        'caracteristicas',
        'perfil_profesional',
        'campo_laboral',
        'porque_estudiar',
        'curso_id',
        'slug'
    ];

    public function curso() {
        return $this->belongsTo(Curso::class);
    }

    public function certificaciones() {
        return $this->hasMany(Certificacion::class);
    }

    /**
     * Get the options for generating the slug.
     */
    public function getSlugOptions() : SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('slug')
            ->saveSlugsTo('slug')
            ->doNotGenerateSlugsOnCreate()
            ->doNotGenerateSlugsOnUpdate();
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
