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
        Schema::create('assuntos', function (Blueprint $table) {
            $table->id()->index();
            $table->foreignId("usuario_id")->index();
            $table->foreignId("area_id")->index();
            $table->string('titulo');
            $table->text('descricao');
            $table->boolean('ativo')->default(false);
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
        Schema::dropIfExists('assuntos');
    }
};
