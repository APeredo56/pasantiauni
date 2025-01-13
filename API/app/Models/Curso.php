<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Curso extends Model {

    use HasFactory, HasSlug;

    public $timestamps = false;

    protected $fillable = [
        'nombre',
        'imagen_url',
        'area',
        'objetivos',
        'semestres',
        'slug'
    ];

    public function carrera() {
        return $this->hasOne(Carrera::class);
    }

    public function maestria() {
        return $this->hasOne(Maestria::class);
    }

    public function diplomado() {
        return $this->hasOne(Diplomado::class);
    }

    public function materias() {
        return $this->belongsToMany(Materia::class)->withPivot('semestre');
    }

    public function contactos() {
        return $this->belongsToMany(Contacto::class)->withPivot('cargo');
    }

    public function getSlugOptions() : SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('nombre')
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
