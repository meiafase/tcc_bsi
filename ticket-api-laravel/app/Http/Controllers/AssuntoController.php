<?php

namespace App\Http\Controllers;

use App\Http\Requests\AssuntoRequest;
use App\Services\AssuntoService;
use App\Services\CategoriaService;


class AssuntoController extends Controller
{
    protected $service;
    protected $categoriaService;


    public function __construct(
        AssuntoService $service,
        CategoriaService $categoriaService
    )
    {
        $this->service = $service;
        $this->categoriaService = $categoriaService;
    }

    public function cadastrar(AssuntoRequest $request)
    {
        return $this->service->cadastrar($request->dataRequest());
    }

    public function editar(int $id, AssuntoRequest $request)
    {
        return $this->service->editar($id, $request->dataRequest());
    }

    public function listar(AssuntoRequest $request)
    {
        return $this->service->listar($request->dataRequest());
    }

    public function buscarPorAssunto(int $id)
    {
        return $this->categoriaService->buscarPorAssunto($id);
    }

    public function ListarPorCategoriasAtivas(int $id, AssuntoRequest $request)
    {
        return $this->service->ListarPorCategoriasAtivas($id, $request->dataRequest());
    }
}
