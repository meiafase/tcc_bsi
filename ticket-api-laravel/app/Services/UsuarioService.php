<?php

namespace App\Services;

use App\Repositories\UsuarioRepository;
use App\Services\RabbitMQService;
use App\Services\PermissoesService;
use Exception;

class UsuarioService
{
    protected $repository;
    protected $rabbitMQService;
    protected $permissoesService;

    public function __construct(
        UsuarioRepository $repository,
        RabbitMQService $rabbitMQService,
        PermissoesService $permissoesService
    )
    {
        $this->repository = $repository;
        $this->rabbitMQService = $rabbitMQService;
        $this->permissoesService = $permissoesService;
    }

    public function cadastrar()
    {
        try {
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
            $password = '12345678';
            $objeto['password'] = password_hash($password, PASSWORD_DEFAULT);
            // $objeto['password'] = '12345678';
            }

            //Salva usuario no BD Laravel
            $usuario = $this->repository->criar($objeto);

            //enviar email usuario e senha.


            return array(
                'status' => true,
                'mensagem' => "Usuário cadastrado com sucesso.",
                'dados' =>  $usuario
            );

        } catch (Exception $ex) {
            return array(
                'status' => false,
                'mensagem' => "Erro ao cadastrar usuário.",
                'exception' => $ex->getMessage()
            );
        }
    }

    public function editar($dados)
    {
        try {
            $usuario = $this->repository->filtrar([['email', $dados['email']]])->first();

            $resset = [
                "password" => password_hash($dados["password"], PASSWORD_DEFAULT),
                "primeiro_acesso" => false
            ];
            $retorno = $this->repository->atualizar($usuario->id, $resset);

            return array(
                'status' => true,
                'mensagem' => "Senha atualizada com sucesso.",
                'dados' =>  $retorno
            );
        } catch (Exception $ex) {
            return array(
                'status' => false,
                'mensagem' => "Erro na solicitação.",
                'exception' => $ex->getMessage()
            );
        }
    }

    public function buscar($id)
    {
        try {
            return array(
                'status' => true,
                'mensagem' => "Usuário retornado com sucesso.",
                'dados' =>  $this->repository->obter($id)
            );

        } catch (Exception $ex) {
            return array(
                'status' => false,
                'mensagem' => "Erro ao retornar usuario.",
                'exception' => $ex->getMessage()
            );
        }
    }

    public function validarPermissoesLogin($id)
    {
        $usuario = $this->repository->obter($id);
        if ($usuario->permissoes == null) {
            unset($usuario->permissoes);
            $usuario->setAttribute('permissoes', $this->permissoesService->iniciarPermissoes($usuario));
        }
        return $usuario;
    }

    public function listarEquipe($usuario)
    {
        if (!$usuario->isCoordenador()) {
            if ($usuario->permissoes->manter_permissoes) {
                $this->equipePermissao = $this->repository->listarEquipe($usuario->coord_id);
                return $this->equipePermissao;
            } else {
                return [$usuario];
            }
        } else {
            $this->equipePermissao = $this->repository->listarEquipe($usuario->id);
            return array_merge_recursive([$usuario], $this->equipePermissao);
        }
    }
}
