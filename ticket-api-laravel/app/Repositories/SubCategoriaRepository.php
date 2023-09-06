<?php

namespace App\Repositories;

use App\Models\SubCategoria;
use App\Repositories\Base\BaseRepository;

class SubCategoriaRepository extends BaseRepository
{
    public function __construct()
    {
        $this->model = SubCategoria::class;
    }
}
