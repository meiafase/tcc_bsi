<?php

namespace App\Repositories;

use App\Models\Adicional;
use App\Repositories\Base\BaseRepository;


class AdicionalRepository extends BaseRepository
{
    public function __construct()
    {
        $this->model = Adicional::class;

    }

    public function contagem(int $id, string $coluna)
    {
        $query = $this->model::where($coluna,$id)->get();
        $quantidade = $query ? count($query) : 0;
        return $quantidade;
    }
}
