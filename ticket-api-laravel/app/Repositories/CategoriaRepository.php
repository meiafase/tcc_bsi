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
}
