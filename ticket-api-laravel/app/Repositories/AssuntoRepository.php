<?php

namespace App\Repositories;

use App\Models\Assunto;
use App\Repositories\Base\BaseRepository;
use Illuminate\Support\Facades\DB;
use Exception;


class AssuntoRepository extends BaseRepository
{
    public function __construct()
    {
        $this->model = Assunto::class;
    }
}
