<?php

namespace App\Services;

use App\Repositories\AnexoRepository;

class AnexoService
{
    protected $repository;
    public function __construct(AnexoRepository $repository)
    {
        $this->repository = $repository;
    }

    public function cadastrar($dados)
    {
        return $this->repository->criar($dados);
    }

    public function obter($anexo_id)
    {
        return $this->repository->obter($anexo_id);
    }
}
