<?php

namespace App\Services;

use App\Repositories\AssuntoRepository;
use App\Models\Categoria;
use Illuminate\Support\Facades\DB;
use Exception;

class AssuntoService
{
    protected $repository;
    public function __construct(
        AssuntoRepository $repository,
        // CategoriaService $categoriaService,
        // SubCategoriaService $subCategoriaService
    ) {
        $this->repository = $repository;
        // $this->categoriaService = $categoriaService;
        // $this->subCategoriaService = $subCategoriaService;
    }

    public function cadastrar($dados)
    {
        try {
            if ($dados['usuario']['permissoes']['manter_catalogo'] || $dados['usuario']->isCoordenador()){
                DB::beginTransaction();
                $dados["usuario_id"] = $dados["usuario"]["id"];
                $dados["area_id"] = $dados["area_id"] ?? $dados["usuario"]["area_id"];
                unset($dados["usuario"]);

                $dados = $this->repository->criar($dados);

                DB::commit();
                return array(
                    "status"    => true,
                    "mensagem"  => "Assunto cadastrado com sucesso",
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
                'mensagem'  => "Erro ao cadastrar assunto.",
                'exception' => $ex->getMessage()
            );
        }
    }

    public function editar(int $id, $dados)
    {
        try {
            if ($dados['usuario']['permissoes']['manter_catalogo'] || $dados['usuario']->isCoordenador()){
                unset($dados["usuario"]);

                DB::beginTransaction();
                $dados = $this->repository->atualizar($id, $dados);

                DB::commit();
                return array(
                    "status" => true,
                    "mensagem" => "Assunto editado com sucesso",
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
                'mensagem'  => "Erro ao editar assunto.",
                'exception' => $ex->getMessage()
            );
        }
    }

    public function listar($dados)
    {
        try{
            $filtros = [['area_id', $dados['usuario']['area_id']]];
            $with = ["categorias.Adicionais", "categorias.subCategorias", "categorias.subCategorias.adicionais"];
            $dados = $this->repository->filtrar($filtros, $with, "titulo", "ASC");

            return array(
                "status" => true,
                "mensagem" => "Assunto listado com sucesso",
                "dados" => $dados
            );
        } catch (Exception $ex) {
            return array(
                'status'    => false,
                'mensagem'  => "Erro ao listar assunto.",
                'exception' => $ex->getMessage()
            );
        }
    }

    public function ListarPorCategoriasAtivas($id, $dados)
    {
        try{
            $query = ["categorias" => function ($query) {
                $query->where("ativo", 1);
            }, "categorias.Adicionais", "categorias.subCategorias" => function ($query) {
                $query->where("ativo", 1);
            }, "categorias.subCategorias.adicionais"];

            if (!($dados["usuario"]["tp_coord"] || $dados["usuario"]["permissoes"]["abrir_chamados_restritos"])) {
                $query["categorias"] = function ($query) {
                    $query->where("restricao", 0)->where("ativo", 1);
                };
                $query["categorias.subCategorias"] = function ($query) {
                    $query->where("restricao", 0)->where("ativo", 1);
                };
            }

            $dados = $this->repository->obter($id, $query);

            return array(
                "status" => true,
                "mensagem" => "Assunto listado com sucesso",
                "dados" => $dados['categorias']
            );
        } catch (Exception $ex) {
            return array(
                'status'    => false,
                'mensagem'  => "Erro ao listar assunto.",
                'exception' => $ex->getMessage()
            );
        }
    }
}
