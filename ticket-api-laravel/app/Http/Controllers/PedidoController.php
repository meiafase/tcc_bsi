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

    public function alterarStatus(int $id, PedidoRequest $request)
    {
        return $this->service->alterarStatus($id, $request->dataRequest());
    }

    public function cadastrarAvaliacao(int $id, PedidoRequest $request)
    {
        return $this->service->cadastrarAvaliacao($id, $request->dataRequest());
    }

    public function filtrarRespSolic(int $tipo_id, PedidoRequest $request)
    {
        return $this->service->filtrarRespSolic($tipo_id, $request->dataRequest());
    }

    public function buscarHistorico(int $id)
    {
        return $this->service->buscarHistorico($id);
    }

    public function listarPedidos(PedidoRequest $request)
    {
        return $this->service->listarPedidos($request->dataRequest());
    }
    public function atribuirUsuario(int $id, PedidoRequest $request)
    {
        return $this->service->atribuirUsuario($id, $request->dataRequest());
    }
}
