<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoriaRequest;
use App\Services\CategoriaService;

class CategoriaController extends Controller
{
    protected $service;

    public function __construct(CategoriaService $service)
    {
        $this->service = $service;
    }

    public function cadastrar(CategoriaRequest $request)
    {
        return $this->service->cadastrar($request->dataRequest());
    }

    public function editar(CategoriaRequest $request, $id)
    {
        return $this->service->editar($id, $request->dataRequest());
    }

    public function buscar(int $id)
    {
        return $this->service->buscar($id);
    }
}
