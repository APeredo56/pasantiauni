<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Departamento extends Model {

    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'nombre'
    ];

    public function contactos()
    {
        return $this->belongsToMany(Contacto::class)->withPivot('cargo');
    }


}
