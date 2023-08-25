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
        Schema::create('usuarios', function (Blueprint $table) {
            $table->id()->index();
            $table->string('nome');
            $table->string('email')->unique();
            $table->string('senha');
            $table->boolean('primeiro_acesso')->default(true);
            $table->foreignId('area_id')->index();
            $table->char('tp_coord', 1)->nullable()->default(NULL);
            $table->foreignId('coord_id')->index();
            $table->boolean('status')->default(true);
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
        Schema::dropIfExists('usuarios');
    }
};
