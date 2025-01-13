<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DepartamentoModulo extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'departamento_id',
        'modulo_id'
    ];

    public function departamento()
    {
        return $this->belongsTo(Departamento::class);
    }

    public function modulo()
    {
        return $this->belongsTo(Modulo::class);
    }
}
