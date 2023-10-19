<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\PermissoesRepository;
use App\Models\Permissoes;
use Exception;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;

/**
 * @property PermissoesRepository $permissoesRepository
 */
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
        }
        return $this->repository->criar($dados);
    }

    public function alterarPermissoes(array $dados, int $usuario_id)
    {
        try {
            DB::beginTransaction();
            if($dados['usuario']['permissoes']['manter_permissoes'] || $dados['usuario']->isCoordenador()){
                $permissoes = $this->repository->atualizarPermissoes($usuario_id, $dados)->toArray();

                DB::commit();
                return array(
                    'status' 	=> true,
                    'mensagem' 	=> "Permissões atualizadas com sucesso.",
                    'dados' 	=>  $permissoes
                );
            } else {
                return array(
                    'status' 	=> true,
                    'mensagem' 	=> "Usuário sem permissão.",
                    'dados' 	=>  []
                );
            }
        } catch (Exception $ex) {
            DB::rollBack();
            return array(
                'status' 	=> false,
                'mensagem' 	=> "Erro ao atualizar permissões.",
                'exception' => $ex->getMessage()
            );
        }
    }

    public function obterPermissoes(User $usuario)
    {
        return $this->repository->obterPorUsuario($usuario);
    }
}
