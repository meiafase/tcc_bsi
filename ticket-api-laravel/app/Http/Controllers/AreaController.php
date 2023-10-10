<?php

namespace App\Http\Controllers;
use App\Services\AreaService;

use Illuminate\Http\Request;

class AreaController extends Controller
{
    public function __construct(AreaService $service)
    {
        $this->service = $service;
    }

    public function listar()
    {
        return $this->service->listar();
    }

}
