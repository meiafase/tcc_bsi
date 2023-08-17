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
        Schema::create('adicionais', function (Blueprint $table) {
            $table->id();
            $table->foreignId("usuario_id")->constrained();
            $table->foreignId("categoria_id")->nullable()->constrained();
            $table->foreignId("sub_categoria_id")->nullable()->constrained();
            $table->string("titulo");
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
        Schema::dropIfExists('adicionais');
    }
};
