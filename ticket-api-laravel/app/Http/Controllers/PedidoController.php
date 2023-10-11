<?php

namespace App\Http\Controllers;
use App\Http\Requests\PedidoRequest;
use App\Services\PedidoService;
use Illuminate\Http\Request;

class PedidoController extends Controller
{
    protected $service;

    public function __construct(PedidoService $service)
    {
        $this->service = $service;
    }

    public function cadastrar(PedidoRequest $request)
    {
        return $this->service->cadastrar($request->dataRequestPedido());
    }
}
