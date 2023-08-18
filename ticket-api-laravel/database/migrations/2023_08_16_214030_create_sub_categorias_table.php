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
        Schema::create('sub_categorias', function (Blueprint $table) {
            $table->id()->index();
            $table->foreignId("usuario_id")->index();
            $table->foreignId("categoria_id")->index();
            $table->foreignId("prioridade_id")->nullable()->index();
            $table->foreignId("equipe_id")->nullable()->index();
            $table->foreignId("responsavel_id")->nullable()->index();
            $table->string("titulo");
            $table->text("descricao")->nullable();
            $table->boolean("restricao")->default(false);
            $table->boolean("possui_adicionais")->nullable();
            $table->time("prazo_horas")->nullable();
            $table->boolean("ativo")->default(false);
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
        Schema::dropIfExists('sub_categorias');
    }
};
