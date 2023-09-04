<?php

namespace App\Services;

use App\Repositories\PermissoesRepository;


class PermissoesService
{
    private $repository;
    public function __construct(PermissoesRepository $repository)
    {
        $this->repository = $repository;
    }

    public function iniciarPermissoes($usuario)
    {
        $dados = [
            'usuario_id' => $usuario->id,
            'area_id' => $usuario->area_id,
            'abrir_chamados' => 1
        ];
        if ($usuario->isCoordenador()) {
            $dados['abrir_chamados_restritos'] = 1;
            $dados['atender_chamados'] = 1;
            $dados['relatorios'] = 1;
            $dados['manter_catalogo'] = 1;
            $dados['manter_permissoes'] = 1;
            $dados['abertura_area'] = 1;
        }
        return $this->repository->criar($dados);
    }
}
