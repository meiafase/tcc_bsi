<?php

namespace App\Services;

use App\Repositories\MensagemRepository;

class MensagemService
{
    private $repository;
    public function __construct(MensagemRepository $repository)
    {
        $this->repository = $repository;
    }

    public function cadastrar($pedido_id, $usuario_id, $mensagem)
    {
        $dadosMensagem = array(
            "pedido_id"         => $pedido_id,
            "usuario_id"        => $usuario_id,
            "mensagem"          => $mensagem,
            "data_criacao"      => now()
        );
        return $this->repository->criar($dadosMensagem);
    }

    public function obter(int $id, array $with = null)
    {
        return  $this->repository->obter($id, $with);
    }
}
