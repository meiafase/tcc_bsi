<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\AssuntoRequest;
use App\Services\AssuntoService;
use App\Services\CategoriaService;


class AssuntoController extends Controller
{
    protected $service;
    protected $categoriaService;


    // public function __construct(AssuntoService $service, CategoriaService $categoriaService)
    // {
    //     $this->service = $service;
    //     $this->categoriaService = $categoriaService;
    // }

    public function cadastrar(AssuntoRequest $request)
    {
        dd('aqui');
        // return $this->retornoHttp($this->service->cadastrar($request->dataRequest()));
    }
}
