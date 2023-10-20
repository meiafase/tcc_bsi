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
        Schema::table('avaliacoes', function (Blueprint $table) {
            $table->dropColumn('avaliacao_gestor');
            $table->dropColumn('util');
        });
        Schema::table('pedidos', function (Blueprint $table) {
            $table->dropColumn('nota_gestor');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('avaliacoes', function (Blueprint $table) {
            $table->boolean('avaliacao_gestor')->nullable();
            $table->boolean('util')->nullable();
        });
        Schema::table('pedidos', function (Blueprint $table) {
            $table->decimal('nota_gestor', 2, 1)->nullable();
        });
    }
};
