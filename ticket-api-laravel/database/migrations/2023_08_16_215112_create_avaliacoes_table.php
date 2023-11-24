<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('avaliacoes', function (Blueprint $table) {
            $table->id()->index();
            $table->integer('usuario_id')->index();
            $table->foreignId('pedido_id')->index();
            $table->decimal('nota', 2, 1);
            $table->boolean('avaliacao_gestor')->nullable();
            $table->boolean('util')->nullable();
            $table->longText('justificativa')->nullable();
            $table->dateTime('data_criacao');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('avaliacoes');
    }
};
