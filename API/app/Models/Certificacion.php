<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Certificacion extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'tipo',
        'titulo',
        'carrera_id'
    ];

    public function carrera() {
        return $this->belongsTo(Carrera::class);
    }
}
