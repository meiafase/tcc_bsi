<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\AssuntoRequest;
use App\Services\AssuntoService;
use App\Services\Catalogo\AssuntoService as CatalogoAssuntoService;
use App\Services\CategoriaService;


class AssuntoController extends Controller
{
    protected $service;
    // protected $categoriaService;


    public function __construct(
        AssuntoService $service,
        // CategoriaService $categoriaService
    )
    {
        $this->service = $service;
        // $this->categoriaService = $categoriaService;
    }

    public function cadastrar(AssuntoRequest $request)
    {
        return $this->service->cadastrar($request->dataRequest());
    }

    public function editar($id, AssuntoRequest $request)
    {
        return $this->service->editar($id, $request->dataRequest());
    }

    public function listar(AssuntoRequest $request)
    {
        return $this->service->listar($request->dataRequest());
    }
}
