<?php

namespace App\Services;

use App\Repositories\GrupoRepository;
use Exception;
use Illuminate\Support\Facades\DB;

class GrupoService
{
    private $repository;

    public function __construct(
        GrupoRepository $repository,
    ) {
        $this->repository = $repository;
    }

    public function cadastrar($dados)
    {
        try {
            DB::beginTransaction();
            if ($dados['usuario']['permissoes']['manter_permissoes'] || $dados['usuario']->isCoordenador()) {

                $dados["usuario_id"] = $dados["usuario"]["id"];
                $dados["area_id"] = $dados["usuario"]["area_id"];
                unset($dados["usuario"]);

                $dados = $this->repository->criar($dados);

                DB::commit();
                return array(
                    "status" => true,
                    "mensagem" => "Grupo cadastrado com sucesso.",
                    "dados" => $dados
                );
            } else {
                return array(
                    'status'     => true,
                    'mensagem'     => "Usuário sem permissão.",
                    'dados'     =>  []
                );
            }
        } catch (Exception $ex) {
            DB::rollBack();
            return array(
                'status' => false,
                'mensagem' => "Erro ao cadastrar grupo.",
                'exception' => $ex->getMessage()
            );
        }
    }

    public function editar($id, $dados)
    {
        try {
            if ($dados['usuario']['permissoes']['manter_permissoes'] || $dados['usuario']->isCoordenador()) {
                $dados["usuario_id"] = $dados["usuario"]["id"];
                unset($dados["usuario"]);

                DB::beginTransaction();
                $grupo = $this->repository->atualizar($id, $dados);

                if (isset($dados["integrantes"]) && count($dados["integrantes"]) > 0) {
                    $grupo->integrantes()->detach();

                    $grupo->integrantes()->sync($dados['integrantes'], false);
                    $grupo->save();
                    $grupo->load('integrantes');
                } else {
                    $grupo->save();
                }
                DB::commit();

                return array(
                    "status" => true,
                    "mensagem" => "Grupo atualizado com sucesso.",
                    "dados" => $grupo
                );
            } else {
                return array(
                    'status'     => true,
                    'mensagem'     => "Usuário sem permissão.",
                    'dados'     =>  []
                );
            }
        } catch (Exception $ex) {
            DB::rollBack();
            return array(
                'status' => false,
                'mensagem' => "Erro ao atualizar grupo.",
                'exception' => $ex->getMessage()
            );
        }
    }

    public function listar($area_id)
    {
        try {
            $dados = $this->repository->filtrar(["area_id" => $area_id], ['integrantes'], "titulo", "ASC");

            return array(
                'status'     => true,
                'mensagem'     => "Listagem carregada com sucesso.",
                'dados'     =>  $dados
            );
        } catch (Exception $ex) {
            DB::rollBack();
            return array(
                'status'     => false,
                'mensagem'     => "Erro ao retornar listagem.",
                'exception'     => $ex->getMessage()
            );
        }
    }

    public function buscar($id)
    {
        try {

            $dados = $this->repository->obter($id, ['integrantes'], "titulo", "ASC");
            if ($dados) {
                return array(
                    'status'    => true,
                    'mensagem'  => "Grupo carregado com sucesso.",
                    'dados'     =>  $dados
                );
            } else {
                return array(
                    'status'    => true,
                    'mensagem'  => "Não há dados para retornar.",
                    'dados'     =>  []
                );
            }
        } catch (Exception $ex) {
            DB::rollBack();
            return array(
                'status'     => false,
                'mensagem'   => "Erro ao retornar grupo.",
                'exception'  => $ex->getMessage()
            );
        }
    }
}
