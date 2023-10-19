<?php

namespace App\Http\Controllers;

use App\Services\SubCategoriaService;
use App\Http\Requests\SubCategoriaRequest;

class SubCategoriaController extends Controller
{
    protected $service;
    public function __construct(SubCategoriaService $service)
    {
        $this->service = $service;
    }

    public function cadastrar(SubCategoriaRequest $request)
    {
        return $this->service->cadastrar($request->dataRequest());
    }

    public function editar($id, SubCategoriaRequest $request)
    {
        return $this->service->editar($id, $request->dataRequest());
    }

    public function buscar($id) 
    {
        return $this->service->buscar($id);
    }
}
