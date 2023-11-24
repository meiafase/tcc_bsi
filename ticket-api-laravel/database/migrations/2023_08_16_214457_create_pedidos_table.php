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
        Schema::create('pedidos', function (Blueprint $table) {
            $table->id()->index();
            $table->integer('solicitante_id')->index();
            $table->integer('responsavel_id')->nullable()->index();
            $table->foreignId('area_id')->index();
            $table->foreignId('assunto_id')->index();
            $table->foreignId('categoria_id')->index();
            $table->foreignId('sub_categoria_id')->nullable()->index();
            $table->foreignId('status_id')->index();
            $table->foreignId('prioridade_id')->index();
            $table->dateTime('prazo_limite')->nullable();
            $table->dateTime('inicio_atendimento')->nullable();
            $table->dateTime('fim_atendimento')->nullable();
            $table->BigInteger('tempo_total_atendimento')->nullable()->default(NULL);
            $table->decimal('nota_solicitante', 2, 1)->nullable();
            $table->decimal('nota_gestor', 2, 1)->nullable();
            $table->string('justificativa_cancelar', 500)->nullable();
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
        Schema::dropIfExists('pedidos');
    }
};
