<?php

namespace App\Services;

use App\Repositories\StatusRepository;

class StatusService
{
    public function __construct(StatusRepository $repository)
    {
        $this->repository = $repository;
    }

    public function obter ($id){
        return $this->repository->obter($id);
    }
}
