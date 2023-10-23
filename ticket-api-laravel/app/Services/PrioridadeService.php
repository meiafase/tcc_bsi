<?php

namespace App\Services;
use Exception;
use App\Repositories\PrioridadeRepository;

class PrioridadeService
{
    public function __construct(PrioridadeRepository $repository)
    {
        $this->repository = $repository;
    }

    public function listar()
    {
        try {
            $dados = $this->repository->listar();
            return array(
                'status' 	=> true,
                'mensagem' 	=> "Prioridades listada com sucesso.",
                'dados' 	=> $dados
            );

        } catch (Exception $ex) {
            return array(
                'status' 	=> false,
                'mensagem' 	=> "Erro ao listar Prioridades.",
                'exception' => $ex->getMessage()
            );
        }
    }
}
