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
        );
        return $this->repository->criar($dadosHistorico);
    }

    public function buscar($pedido_id)
    {
        return $this->repository->buscar($pedido_id);
    }
}
