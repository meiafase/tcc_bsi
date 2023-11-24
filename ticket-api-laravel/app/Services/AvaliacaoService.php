<?php

namespace App\Services;

use App\Repositories\AvaliacaoRepository;

class AvaliacaoService
{
    public function __construct(AvaliacaoRepository $repository)
    {
        $this->repository = $repository;
    }

    public function cadastrar($pedido_id, $dados)
    {

        $avaliacao = array(
            "pedido_id" => $pedido_id,
            "usuario_id" => $dados['usuario']->id,
            "nota" => $dados['nota'],
            "justificativa" => @$dados['justificativa'],
            "data_criacao" => now()
        );

        return $this->repository->criar($avaliacao);
    }
}
