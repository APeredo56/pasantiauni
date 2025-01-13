<?php

namespace Database\Seeders;
use App\Constants\ModuloIDConstants;
use App\Models\Modulo;
use Illuminate\Database\Seeder;

class ModuloSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Modulo::create([
            'id' => ModuloIDConstants::POSTGRADO,
            'nombre' => 'Postgrado'
        ]);

        Modulo::create([
            'id' => ModuloIDConstants::PREGRADO,
            'nombre' => 'Pregrado'
        ]);

        Modulo::create([
            'id' => ModuloIDConstants::IDIOMAS,
            'nombre' => 'Idiomas'
        ]);

        Modulo::create([
            'id' => ModuloIDConstants::COORDINADORES_PREGRADO,
            'nombre' => 'Coordinadores de Pregrado'
        ]);

        Modulo::create([
            'id' => ModuloIDConstants::REVISTA_ESTUDIANTIL,
            'nombre' => 'Revista Estudiantil'
        ]);
    }
}
