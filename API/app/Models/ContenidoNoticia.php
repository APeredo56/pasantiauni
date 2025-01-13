<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ContenidoNoticia extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'tipo',
        'contenido',
        'noticia_id'
    ];

    public function noticia() {
        return $this->belongsTo(Noticia::class);
    }
}
