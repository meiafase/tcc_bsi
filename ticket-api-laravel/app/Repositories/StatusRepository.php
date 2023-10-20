<?php

namespace App\Repositories;

use App\Models\Status;
use App\Repositories\Base\BaseRepository;

class StatusRepository extends BaseRepository
{
    public function __construct()
    {
        $this->model = Status::class;
    }
}
