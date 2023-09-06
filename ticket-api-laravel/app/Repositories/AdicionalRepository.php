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
}
