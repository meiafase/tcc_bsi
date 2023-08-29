<?php

namespace App\Services;

use App\Repositories\UsuarioRepository;
use App\Services\RabbitMQServiceService;

class UsuarioService
{
    protected $repository;
    protected $rabbitMQService;

    public function __construct(UsuarioRepository $repository, RabbitMQService $rabbitMQService)
    {
        $this->repository = $repository;
        $this->rabbitMQService = $rabbitMQService;
    }

    public function cadastrar()
    {
        $fila = "node";
        $usuarios = $this->rabbitMQService->consume($fila);
        $objeto = [];
        dd('aqui', $usuarios);
    }
}
