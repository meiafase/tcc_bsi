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
        Schema::create('permissoes', function (Blueprint $table) {
            $table->id()->index();
            $table->integer('usuario_id')->index();
            $table->integer('area_id')->index();
            $table->boolean('abrir_chamados')->default(true);
            $table->boolean('abrir_chamados_restritos')->default(false);
            $table->boolean('atender_chamados')->default(false);
            $table->boolean('relatorios')->default(false);
            $table->boolean('manter_catalogo')->default(false);
            $table->boolean('manter_permissoes')->default(false);
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
        Schema::dropIfExists('permissoes');
    }
};
