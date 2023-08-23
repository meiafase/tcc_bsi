<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AreaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table("areas")->insert(
            [
                [
                    "titulo" => "ADMINISTRATIVO",
                    "created_at" => now(),
                    "updated_at" => now()
                ],
                [
                    "titulo" => "COBRANCA",
                    "created_at" => now(),
                    "updated_at" => now()
                ],
                [
                    "titulo" => "COMPRAS",
                    "created_at" => now(),
                    "updated_at" => now()
                ],
                [
                    "titulo" => "COMUNICAÇÃO",
                    "created_at" => now(),
                    "updated_at" => now()
                ],
                [
                    "titulo" => "CONSULTORIA",
                    "created_at" => now(),
                    "updated_at" => now()
                ],
                [
                    "titulo" => "CONTABIL",
                    "created_at" => now(),
                    "updated_at" => now()
                ],
                [
                    "titulo" => "DESENVOLVIMENTO",
                    "created_at" => now(),
                    "updated_at" => now()
                ],
                [
                    "titulo" => "DIRETORIA",
                    "created_at" => now(),
                    "updated_at" => now()
                ],
                [
                    "titulo" => "FINANCEIRO",
                    "created_at" => now(),
                    "updated_at" => now()
                ],
                [
                    "titulo" => "MARKETING",
                    "created_at" => now(),
                    "updated_at" => now()
                ],
                [
                    "titulo" => "PROJETOS",
                    "created_at" => now(),
                    "updated_at" => now()
                ],
                [
                    "titulo" => "RECURSOS HUMANOS",
                    "created_at" => now(),
                    "updated_at" => now()
                ],
                [
                    "titulo" => "T.I - TECNOLOGIA",
                    "created_at" => now(),
                    "updated_at" => now()
                ],
                [
                    "titulo" => "VENDAS",
                    "created_at" => now(),
                    "updated_at" => now()
                ],
            ]
        );
    }
}
