<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Modulo extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'nombre'
    ];

    public function departamentos()
    {
        return $this->belongsToMany(Departamento::class);
    }
}
