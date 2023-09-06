<?php

namespace App\Services;

use App\Repositories\CategoriaRepository;
use Illuminate\Support\Facades\DB;
use Exception;

class CategoriaService
{
    protected $repository;
    protected $adicionalService;

    public function __construct(
        CategoriaRepository $repository,
        AdicionalService $adicionalService,
        // CategoriaService $categoriaService,
        // SubCategoriaService $subCategoriaService
    ) {
        $this->repository = $repository;
        $this->adicionalService = $adicionalService;
        // $this->categoriaService = $categoriaService;
        // $this->subCategoriaService = $subCategoriaService;
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
                    "mensagem"  => "Categoria cadastrada com sucesso",
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
                'mensagem'  => "Erro ao cadastrar categoria.",
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
