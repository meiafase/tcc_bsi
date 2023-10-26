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
            if ($dados['usuario']['permissoes']['manter_catalogo'] || $dados['usuario']->isCoordenador()) {
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
                    'status'     => true,
                    'mensagem'     => "Usuário sem permissão.",
                    'dados'     =>  []
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
            if ($dados['usuario']['permissoes']['manter_catalogo'] || $dados['usuario']->isCoordenador()) {
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
                    'status'     => true,
                    'mensagem'     => "Usuário sem permissão.",
                    'dados'     =>  []
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

    public function buscarPorAssunto($id)
    {
        try {
            return array(
                "status" => true,
                "mensagem" => "Listagem carregada com sucesso",
                "dados" => $this->repository->buscarPorAssunto($id)
            );
        } catch (Exception $ex) {
            DB::rollBack();
            return array(
                'status'    => false,
                'mensagem'  => "Erro ao carregar listagem.",
                'exception' => $ex->getMessage()
            );
        }
    }

    public function categoriaValidacao(int $id)
    {
        $adicional = $this->adicionalService->contagem($id);
        $categoria = $this->repository->obterColunas($id, ["possui_subcategorias", "possui_adicionais", "equipe_id", "responsavel_id", "prazo_horas", "prioridade_id"]);

        return array(
            "adicional" => $adicional,
            "categoria" => $categoria
        );
    }

    public function buscar(int $id)
    {
        try {
            return array(
                "status" => true,
                "mensagem" => "Categoria carregada com sucesso",
                "dados" => $this->repository->obter($id, ['subCategorias', 'responsavel', 'grupo'])
            );
        } catch (Exception $ex) {
            DB::rollBack();
            return array(
                'status'    => false,
                'mensagem'  => "Erro ao carregar categoria.",
                'exception' => $ex->getMessage()
            );
        }
    }
}
