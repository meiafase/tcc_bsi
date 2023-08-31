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
        // try {

            //Busca cadastro no Rabbit
            $fila = "node";
            $usuarios = $this->rabbitMQService->consume($fila);
            $objeto = [];
            foreach ($usuarios as $usuario) {
                $array = json_decode($usuario, true);
                foreach ($array as $key => $value) {
                    if (is_array($value)) {
                        foreach ($value as $subKey => $subValue) {
                            $objeto[$subKey] =  $subValue;
                        }
                    } else {
                        $objeto[$key] = $value;
                    }
                }
            // $senha = substr(str_shuffle('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'), 0, 8);
            $senha = '12345678';
            // $objeto['senha'] = password_hash($senha, PASSWORD_DEFAULT);
            $objeto['senha'] = '12345678';
            }

            //Salva usuario no BD Laravel
            $usuario = $this->repository->criar($objeto);

            //enviar email usuario e senha.


            return $usuario;

            // dd('aqui', $user);

        // } catch () {
        //     dd('deu ruim');
        // }
    }
}
