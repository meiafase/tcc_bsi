<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Request;

class BaseRequest extends FormRequest
{

    public $usuario;
    public $dadosPedido;

    public function __construct(Request $request)
    {
        $this->usuario = $request->user();
        $this->request = $request;
    }

    public function dataRequest(){
        $dados = $this->all();
        $dados['usuario'] = $this->usuario;
        $dados['usuario']['permissoes'] = $this->usuario->permissoes;
        return $dados;
    }

    public function dataRequestPedido(){
        $dados = $this->dataRequest();
        $dados['dadosPedido'] = $this->dadosPedido;
        return $dados;
    }

}
