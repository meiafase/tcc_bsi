<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PrioridadeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table("prioridades")->insert(
            [
                [
                    "descricao" => "Baixa",
                    "created_at" => now(),
                    "updated_at" => now()
                ],
                [
                    "descricao" => "Média",
                    "created_at" => now(),
                    "updated_at" => now()
                ],
                [
                    "descricao" => "Alta",
                    "created_at" => now(),
                    "updated_at" => now()
                ],
                [
                    "descricao" => "Muito Alta",
                    "created_at" => now(),
                    "updated_at" => now()
                ],
            ]
        );
    }
}
