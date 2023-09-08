<?php

namespace App\Repositories;

use App\Models\Categoria;
use App\Repositories\Base\BaseRepository;


class CategoriaRepository extends BaseRepository
{
    public function __construct()
    {
        $this->model = Categoria::class;
    }

    public function buscarPorAssunto($id)
    {
        $order = 'ASC';
        return $this->model::where('assunto_id', $id)
            ->with(['subCategorias' => function ($query) use ($order) {
                $query->OrderBy("titulo", $order);
            }, 'adicionais', 'subCategorias.adicionais'])
            ->orderBy('titulo', $order)
            ->get();
    }
}
