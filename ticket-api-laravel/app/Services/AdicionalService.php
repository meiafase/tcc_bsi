<?php

namespace App\Services;

use App\Repositories\AdicionalRepository;
use Illuminate\Support\Facades\DB;
use Exception;

class AdicionalService
{
    protected $repository;
    public function __construct(AdicionalRepository $repository)
    {
        $this->repository = $repository;
    }

    public function cadastrar($user_id, $id_referencia, $dados, $campo = true)
    {
        try {
            DB::beginTransaction();

            $adicional = array(
                $campo ? "categoria_id" : "sub_categoria_id" => $id_referencia,
                "usuario_id" => $user_id,
                "titulo" => $dados
            );
            $dados = $this->repository->criar($adicional);

            DB::commit();
            return array(
                "status"    => true,
                "mensagem"  => "Adicional cadastrado com sucesso",
                "dados"     => $dados
            );


        } catch (Exception $ex) {
            DB::rollBack();
            return array(
                'status'    => false,
                'mensagem'  => "Erro ao cadastrar adicional.",
                'exception' => $ex->getMessage()
            );
        }
    }

    public function contagem(int $id, $categoria = true)
    {
        if ($categoria) {
            return $this->repository->contagem($id, "categoria_id");
        } else {
            return $this->repository->contagem($id, "sub_categoria_id");
        }
    }
}
