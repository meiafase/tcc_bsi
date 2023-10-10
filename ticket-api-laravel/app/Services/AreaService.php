<?php

namespace App\Services;

use App\Repositories\AreaRepository;
use Illuminate\Support\Facades\DB;
use Exception;

class AreaService
{
    protected $repository;
    public function __construct(
        AreaRepository $repository,
    ) {
        $this->repository = $repository;
    }

    public function listar()
    {
        try{
            $dados = $this->repository->listar();

            return array(
                "status" => true,
                "mensagem" => "Area listada com sucesso",
                "dados" => $dados
            );
        } catch (Exception $ex) {
            return array(
                'status'    => false,
                'mensagem'  => "Erro ao listar area.",
                'exception' => $ex->getMessage()
            );
        }
    }

    public function listarAssuntos(int $id)
    {
        try{
            $dados = $this->repository->obter($id, ["assuntos" => function($query){
                $query->where("ativo", 1);
            }]);

            return array(
                "status" => true,
                "mensagem" => "Assuntos listados com sucesso",
                "dados" => $dados['assuntos']
            );
        } catch (Exception $ex) {
            return array(
                'status'    => false,
                'mensagem'  => "Erro ao listar assuntos.",
                'exception' => $ex->getMessage()
            );
        }
    }
}
