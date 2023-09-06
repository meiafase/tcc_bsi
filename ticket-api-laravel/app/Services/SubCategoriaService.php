<?php

namespace App\Services;

use App\Repositories\SubCategoriaRepository;
use Illuminate\Support\Facades\DB;
use Exception;

class SubCategoriaService
{
    protected $repository;
    protected $adicionalService;

    public function __construct(
        SubCategoriaRepository $repository,
        AdicionalService $adicionalService,

    ) {
        $this->repository = $repository;
        $this->adicionalService = $adicionalService;
    }

    public function cadastrar($dados)
    {
        try {
            if ($dados['usuario']['permissoes']['manter_catalogo'] || $dados['usuario']->isCoordenador()){
                DB::beginTransaction();
                $dados["usuario_id"] = $dados["usuario"]["id"];
                unset($dados["usuario"]);

                $dados = $this->repository->criar($dados);

                DB::commit();
                return array(
                    "status"    => true,
                    "mensagem"  => "Sub Categoria cadastrada com sucesso",
                    "dados"     => $dados
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
                'status'    => false,
                'mensagem'  => "Erro ao cadastrar sub categoria.",
                'exception' => $ex->getMessage()
            );
        }
    }

    public function editar(int $id, $dados)
    {
        try {
            if ($dados['usuario']['permissoes']['manter_catalogo'] || $dados['usuario']->isCoordenador()){
                $dados["usuario_id"] = $dados["usuario"]["id"];
                unset($dados["usuario"]);

                DB::beginTransaction();
                //Cadastro da Categoria
                $categoria = $this->repository->atualizar($id, $dados);

                // Cadastro Adicionais
                if (isset($dados["adicionais"])) {
                    foreach ($dados["adicionais"] as $adicional) {
                        if (!isset($adicional["id"]) || !$adicional["id"]) {
                            $this->adicionalService->cadastrar($dados["usuario_id"], $categoria->id, $adicional["titulo"]);
                        }
                    }
                }

                $categoria->load("adicionais");
                DB::commit();
                return array(
                    "status" => true,
                    "mensagem" => "Categoria editada com sucesso",
                    "dados" => $dados
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
                'status'    => false,
                'mensagem'  => "Erro ao editar categoria.",
                'exception' => $ex->getMessage()
            );
        }
    }


}
