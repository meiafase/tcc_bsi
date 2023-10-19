<?php

namespace App\Repositories;

use App\Models\Anexo;
use App\Repositories\Base\BaseRepository;

class AnexoRepository extends BaseRepository
{
    public function __construct()
    {
        $this->model = Anexo::class;
    }
}
