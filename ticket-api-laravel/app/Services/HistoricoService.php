<?php

namespace App\Services;

use App\Repositories\HistoricoRepository;

class HistoricoService
{
    protected $repository;
    public function __construct(HistoricoRepository $repository)
    {
        $this->repository = $repository;
    }

    public function cadastrar($usuario_id, $pedido_id, $descricao)
    {
        $dadosHistorico = array(
            "usuario_id" => $usuario_id,
            "pedido_id" => $pedido_id,
            "descricao" => $descricao,
            "data_criacao" => now()
        );
        return $this->repository->criar($dadosHistorico);
    }

    public function filtrar($pedido_id)
    {
        return $this->repository->filtrar(array(['pedido_id', $pedido_id]), ['usuario']);
    }
}
