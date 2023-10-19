<?php

namespace App\Http\Controllers;
use App\Services\AreaService;

use Illuminate\Http\Request;

class AreaController extends Controller
{
    protected $service;

    public function __construct(AreaService $service)
    {
        $this->service = $service;
    }

    public function listar()
    {
        return $this->service->listar();
    }

    public function listarAssuntos(int $id)
    {
        return $this->service->listarAssuntos($id);
    }

}
