<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\GrupoRequest;
use App\Services\GrupoService;


class GrupoController extends Controller
{
    private $service;
    public function __construct(GrupoService $service)
    {
        $this->service = $service;
    }

    public function cadastrar(GrupoRequest $request)
    {
        return $this->service->cadastrar($request->dataRequest());
    }

    public function editar($id, GrupoRequest $request)
    {
        return $this->service->editar($id, $request->dataRequest());
    }

    public function listar($area_id)
    {
        return $this->service->listar($area_id);
    }

    public function buscar($id)
    {
        return $this->service->buscar($id);
    }
}
