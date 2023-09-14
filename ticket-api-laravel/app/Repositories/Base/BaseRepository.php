<?php

namespace App\Repositories\Base;

// use App\Interfaces\BaseInterface;

class BaseRepository
// class BaseRepository implements BaseInterface
{

    protected $model;

    public function listar()
    {
        return $this->model::all();
    }

    public function paginacao()
    {
        return $this->model::paginate();
    }

    public function obter($id, array $with = null)
    {
        if (isset($with) && sizeof($with) > 0) {
            return $this->model::with($with)->find($id);
        }
        return $this->model::find($id);
    }

    public function filtrar(array $filtros, array $with = null, string $column = null, string $order = null)
    {
        if ($with && ($column && $order)) {
            return $this->model::where($filtros)->with($with)->orderBy($column, $order)->get();
        } else if ($with) {
            return $this->model::where($filtros)->with($with)->get();
        } else if ($column && $order) {
            return $this->model::where($filtros)->orderBy($column, $order)->get();
        } else {
            return $this->model::where($filtros)->get();
        }
    }


    public function filtrarRaw(string $filtros, array $with = null)
    {
        if ($with) {
            return $this->model::whereRaw($filtros)->with($with)->get();
        } else {
            return $this->model::whereRaw($filtros)->get();
        }
    }

    public function criar($dados)
    {
        // dd($dados);
        $objeto = $this->model::create($dados);
        return $objeto;
    }

    public function atualizarCriar($dados)
    {

        $where = [];
        if (isset($dados["categoria_id"]) && $dados["categoria_id"]) {
            $where = ["categoria_id" => $dados["categoria_id"]];
        } else if (isset($dados["sub_categoria_id"]) && $dados["sub_categoria_id"]) {
            $where = ["sub_categoria_id" => $dados["sub_categoria_id"]];
        }

        if (!empty($where)) {
            $this->model::updateOrCreate($where, $dados);
        }
    }

    public function deletar($id)
    {
        return $this->model::find($id)->delete();
        // throw new Exception("PRECISA IMPLEMENTAR");
    }

    public function atualizar(int $id, $dados)
    {
        $objeto = $this->obter($id);
        $objeto->fill($dados);
        $objeto->save();
        return $objeto;
    }

    public function atualizarColuna(int $id, $arrDados)
    {
        return $this->model::where('id', $id)->update($arrDados);
    }

    public function obterColunas(int $id, array $coluna)
    {
        return $this->model::find($id, $coluna);
    }
}
