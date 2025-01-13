<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Enums\TipoContenido;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('contenido_noticias', function (Blueprint $table) {
            $table->id();
            $table->enum('tipo', array_column(TipoContenido::cases(), 'value'));
            $table->text('contenido')->nullable();
            $table->unsignedBigInteger('noticia_id');
            $table->foreign('noticia_id')->references('id')->on('noticias')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contenido_noticias');
    }
};
