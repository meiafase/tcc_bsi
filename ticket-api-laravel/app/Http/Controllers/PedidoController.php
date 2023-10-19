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

    public function cadastrarMensagem(int $id, PedidoRequest $request)
    {
        return $this->service->cadastrarMensagem($id, $request->dataRequest());
    }

    public function buscar(int $id, PedidoRequest $request)
    {
        return $this->service->buscar($id, $request->dataRequest());
    }

    public function iniciarAtendimento(int $id, PedidoRequest $request)
    {
        return $this->service->iniciarAtendimento($id, $request->dataRequest());
    }

    public function baixarAnexo($mensagem_id, $anexo_id)
    {
        return $this->service->baixarAnexo($mensagem_id, $anexo_id);
    }
}
