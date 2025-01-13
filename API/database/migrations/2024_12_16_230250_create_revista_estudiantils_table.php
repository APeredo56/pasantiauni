<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('revista_estudiantils', function (Blueprint $table) {
            $table->id();
            $table->string('titulo');
            $table->text('introduccion');
            $table->string('subtitulo');
            $table->text('descripcion');
            $table->string('icono_url', 1000)->nullable();
            $table->string('autores_url', 1000)->nullable();
            $table->string('pdf_url', 1000)->nullable();
            $table->string('slug')->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('revista_estudiantils');
    }
};
