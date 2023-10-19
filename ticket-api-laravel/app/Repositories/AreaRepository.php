<?php

namespace App\Repositories;

use App\Models\Area;
use App\Repositories\Base\BaseRepository;


class AreaRepository extends BaseRepository
{
    public function __construct()
    {
        $this->model = Area::class;

    }
}
