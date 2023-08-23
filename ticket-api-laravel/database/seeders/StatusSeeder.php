<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
                DB::table("status")->insert(
            [
                [
                    "descricao" => "NOVO",
                    "created_at" => now(),
                    "updated_at" => now()
                ],
                [
                    "descricao" => "EM ATENDIMENTO",
                    "created_at" => now(),
                    "updated_at" => now()
                ],
                [
                    "descricao" => "AGUARDANDO AVALIAÇÃO DO SOLICITANTE",
                    "created_at" => now(),
                    "updated_at" => now()
                ],
                [
                    "descricao" => "FINALIZADO",
                    "created_at" => now(),
                    "updated_at" => now()
                ],
                [
                    "descricao" => "CANCELADO",
                    "created_at" => now(),
                    "updated_at" => now()
                ],
            ]
        );
    }
}
