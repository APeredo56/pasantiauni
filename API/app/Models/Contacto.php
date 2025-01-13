<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contacto extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'nombre',
        'correo',
        'celular',
        'fijo'
    ];

    public function cursos()
    {
        return $this->belongsToMany(Curso::class)->withPivot('cargo');
    }

    public function departamentos()
    {
        return $this->belongsToMany(Departamento::class)->withPivot('cargo');
    }
}
