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
            $table->foreignId('area_id')->constrained('areas')->index();
            $table->foreignId('assunto_id')->constrained('assuntos')->index();
            $table->foreignId('categoria_id')->constrained('categorias')->index();
            $table->foreignId('sub_categoria_id')->nullable()->constrained('sub_categorias')->index();
            $table->foreignId('status_id')->constrained('status')->index();
            $table->foreignId('prioridade_id')->constrained('prioridades')->index();
            $table->dateTime('prazo_limite')->nullable();
            $table->dateTime('inicio_atendimento')->nullable();
            $table->dateTime('fim_atendimento')->nullable();
            $table->BigInteger('tempo_total_atendimento')->nullable()->default(NULL);
            $table->decimal('nota_solicitante', 2, 1)->nullable();
            $table->decimal('nota_gestor', 2, 1)->nullable();
            $table->string('justificativa_cancelar',500)->nullable();
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
