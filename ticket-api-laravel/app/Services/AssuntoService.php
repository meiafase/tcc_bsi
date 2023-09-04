<?php

namespace App\Services;

use App\Repositories\AssuntoRepository;
use App\Models\Categoria;
use Illuminate\Support\Facades\DB;
use Exception;

class AssuntoService
{
    protected $repository;
    public function __construct(
        AssuntoRepository $repository,
        // CategoriaService $categoriaService,
        // SubCategoriaService $subCategoriaService
    ) {
        $this->repository = $repository;
        // $this->categoriaService = $categoriaService;
        // $this->subCategoriaService = $subCategoriaService;
    }

    public function cadastrar($dados)
    {
        $dados["usuario_id"] = $dados["usuario"]["id"];
        $dados["area_id"] = $dados["area_id"] ?? $dados["usuario"]["area_id"];
        unset($dados["usuario"]);
        try {
            DB::beginTransaction();

            $dados = $this->repository->criar($dados);

            DB::commit();

            return array(
                "status"    => true,
                "mensagem"  => "Assunto cadastrado com sucesso",
                "dados"     => $dados
            );
        } catch (Exception $ex) {

            DB::rollBack();

            return array(
                'status'    => false,
                'mensagem'  => "Erro ao cadastrar assunto.",
                'exception' => $ex->getMessage()
            );
        }
    }
}
